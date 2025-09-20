"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile,
  sendEmailVerification 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, googleProvider } from "@/firebase/auth";
import { db } from "@/firebase/firestore";

// Import components
import AuthForm from "@/components/auth/AuthForm";
import RoleSelectionForm from "@/components/auth/RoleSelectionForm";
import SellerDetailsForm from "@/components/auth/SellerDetailsForm";
import BuyerDetailsForm from "@/components/auth/BuyerDetailsForm";
import RegistrationComplete from "@/components/auth/RegistrationComplete";

type UserRole = "seller" | "buyer";
type RegistrationStep = "auth" | "role" | "details" | "complete";

interface SellerDetails {
  companyName: string;
  brandName: string;
  yearEstablished: string;
  areaOfOperation: string;
  productCategory: string;
  logistics: string;
  minOrderValue: string;
  currency: string;
  bankAccount: string;
  regonKrsEin: string;
  address: string;
  phone: string;
  website: string;
}

interface BuyerDetails {
  companyName: string;
  businessType: string;
  companyId: string;
  address: string;
  phone: string;
  website: string;
  facebook: string;
  instagram: string;
}

export default function RegisterPage() {
  // Auth states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Registration flow states
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("auth");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  
  // Form states
  const [sellerDetails, setSellerDetails] = useState<SellerDetails>({
    companyName: "",
    brandName: "",
    yearEstablished: "",
    areaOfOperation: "",
    productCategory: "",
    logistics: "",
    minOrderValue: "",
    currency: "EUR",
    bankAccount: "",
    regonKrsEin: "",
    address: "",
    phone: "",
    website: "",
  });
  
  const [buyerDetails, setBuyerDetails] = useState<BuyerDetails>({
    companyName: "",
    businessType: "",
    companyId: "",
    address: "",
    phone: "",
    website: "",
    facebook: "",
    instagram: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate form
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: name,
      });

      // Send email verification
      await sendEmailVerification(user);

      setFirebaseUser(user);
      setCurrentStep("role");
    } catch (error: any) {
      let errorMessage = "An error occurred during registration";
      
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setFirebaseUser(user);
      setCurrentStep("role");
    } catch (error: any) {
      let errorMessage = "An error occurred during Google registration";
      
      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Registration cancelled";
          break;
        case "auth/popup-blocked":
          errorMessage = "Popup was blocked. Please allow popups for this site";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleFacebookRegister = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     const user = result.user;

  //     setFirebaseUser(user);
  //     setCurrentStep("role");
  //   } catch (error: any) {
  //     let errorMessage = "An error occurred during Facebook registration";
      
  //     switch (error.code) {
  //       case "auth/popup-closed-by-user":
  //         errorMessage = "Registration cancelled";
  //         break;
  //       case "auth/popup-blocked":
  //         errorMessage = "Popup was blocked. Please allow popups for this site";
  //         break;
  //       default:
  //         errorMessage = error.message || errorMessage;
  //     }
      
  //     setError(errorMessage);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentStep("details");
  };

  const handleFinalRegistration = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = {
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName || name,
        email: firebaseUser.email,
        role: selectedRole,
        ...(selectedRole === "seller" ? sellerDetails : buyerDetails),
      };

      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Create user document in Firestore
      const userEmail = firebaseUser.email?.toLowerCase();
      if (userEmail) {
        await setDoc(doc(db, "users", userEmail), {
          name: firebaseUser.displayName || name,
          email: userEmail,
          role: selectedRole,
          status: selectedRole === "buyer" ? "active" : "pending",
          isAdministrator: false,
          createdAt: new Date().toISOString(),
          emailVerified: firebaseUser.emailVerified,
          ...(selectedRole === "seller" ? sellerDetails : buyerDetails),
        });
      }

      setCurrentStep("complete");
    } catch (error: any) {
      setError(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Top Bar */}
      <div className="bg-white text-slate-800 py-2">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span>Mon - Fri 10am - 5pm</span>
            <span>info@wearhub.com</span>
            <span>(555) 5678 12340</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex min-h-screen max-w-6xl flex-col py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to shopping
          </Link>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-100 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentStep === "auth" && (
          <AuthForm
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            acceptTerms={acceptTerms}
            isLoading={isLoading}
            error={error}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onAcceptTermsChange={setAcceptTerms}
            onEmailSubmit={handleEmailRegister}
            onGoogleRegister={handleGoogleRegister}
            // onFacebookRegister={handleFacebookRegister}
          />
        )}

        {currentStep === "role" && (
          <RoleSelectionForm onRoleSelect={handleRoleSelection} />
        )}

        {currentStep === "details" && selectedRole === "seller" && (
          <SellerDetailsForm
            sellerDetails={sellerDetails}
            isLoading={isLoading}
            onDetailsChange={setSellerDetails}
            onSubmit={handleFinalRegistration}
          />
        )}

        {currentStep === "details" && selectedRole === "buyer" && (
          <BuyerDetailsForm
            buyerDetails={buyerDetails}
            isLoading={isLoading}
            onDetailsChange={setBuyerDetails}
            onSubmit={handleFinalRegistration}
          />
        )}

        {currentStep === "complete" && (
          <RegistrationComplete onGoToProfile={handleGoToProfile} />
        )}
      </div>
    </div>
  );
}