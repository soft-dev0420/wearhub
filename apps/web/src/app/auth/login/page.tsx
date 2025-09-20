"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const resetSuccess = searchParams.get("reset") === "success";

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update last login time in Firestore
      const userEmail = user.email?.toLowerCase();
      if (userEmail) {
        try {
          await updateDoc(doc(db, "users", userEmail), {
            lastLoginAt: new Date().toISOString(),
          });
        } catch (error) {
          console.log("Could not update last login time:", error);
        }
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error: any) {
      let errorMessage = "An error occurred during sign in";
      
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later";
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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Update last login time in Firestore
      // const userEmail = user.email?.toLowerCase();
      // if (userEmail) {
      //   try {
      //     await updateDoc(doc(db, "users", userEmail), {
      //       lastLoginAt: new Date().toISOString(),
      //     });
      //   } catch (error) {
      //     console.log("Could not update last login time:", error);
      //   }
      // }
      router.push("/profile");
    } catch (error: any) {
      let errorMessage = "An error occurred during Google sign in";
      
      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Sign in cancelled";
          break;
        case "auth/popup-blocked":
          errorMessage = "Popup was blocked. Please allow popups for this site";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage = "An account already exists with this email using a different sign-in method";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      
    }
  };

  // const handleFacebookLogin = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     const user = result.user;

  //     // Update last login time in Firestore
  //     const userEmail = user.email?.toLowerCase();
  //     if (userEmail) {
  //       try {
  //         await updateDoc(doc(db, "users", userEmail), {
  //           lastLoginAt: new Date().toISOString(),
  //         });
  //       } catch (error) {
  //         console.log("Could not update last login time:", error);
  //       }
  //     }

  //     router.push(callbackUrl);
  //     router.refresh();
  //   } catch (error: any) {
  //     let errorMessage = "An error occurred during Facebook sign in";
      
  //     switch (error.code) {
  //       case "auth/popup-closed-by-user":
  //         errorMessage = "Sign in cancelled";
  //         break;
  //       case "auth/popup-blocked":
  //         errorMessage = "Popup was blocked. Please allow popups for this site";
  //         break;
  //       case "auth/account-exists-with-different-credential":
  //         errorMessage = "An account already exists with this email using a different sign-in method";
  //         break;
  //       default:
  //         errorMessage = error.message || errorMessage;
  //     }
      
  //     setError(errorMessage);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (error: any) {
      let errorMessage = "Failed to send password reset email";
      
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Please try again later";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Image src="/logo_mini.png" width={100} height={70} alt="WearHub" className="transition-all duration-300 invert" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-sm text-white/70">
              Enter your email and password to sign in to your account
            </p>
          </div>

          {resetSuccess && (
            <Alert className="bg-green-900/20 border-green-500/50 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Password reset email sent. Please check your inbox.
              </AlertDescription>
            </Alert>
          )}

          {resetEmailSent && (
            <Alert className="bg-green-900/20 border-green-500/50 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Password reset email sent to {email}. Please check your inbox.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-100">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white font-medium">Password</Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-white/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-4 text-white/70">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              type="button"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              disabled={isLoading}
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            {/* <Button
              variant="outline"
              onClick={handleFacebookLogin}
              type="button"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              disabled={isLoading}
            >
              <FaFacebook className="mr-2 h-4 w-4 text-blue-400" />
              Facebook
            </Button> */}
          </div>

          <p className="px-8 text-center text-sm text-white/70">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
