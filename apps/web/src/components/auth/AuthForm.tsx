"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

interface AuthFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  isLoading: boolean;
  error: string | null;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAcceptTermsChange: (checked: boolean) => void;
  onEmailSubmit: (e: React.FormEvent) => void;
  onGoogleRegister: () => void;
  // onFacebookRegister: () => void;
}

export default function AuthForm({
  name,
  email,
  password,
  confirmPassword,
  acceptTerms,
  isLoading,
  error,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAcceptTermsChange,
  onEmailSubmit,
  onGoogleRegister,
  // onFacebookRegister,
}: AuthFormProps) {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <Image src="/logo_mini.png" width={100} height={70} alt="WearHub" className="transition-all duration-300 invert" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Create an account
        </h1>
        <p className="text-sm text-white/70">
          Enter your details to create a new account
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-100">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={onEmailSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white font-medium">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
            placeholder="Enter your password (min 6 characters)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
            placeholder="Confirm your password"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => onAcceptTermsChange(!!checked)}
            className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label htmlFor="terms" className="text-sm text-white/80">
            I accept the{" "}
            <Link href="/terms" className="text-blue-400 hover:text-blue-300 hover:underline">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300 hover:underline">
              Privacy Policy
            </Link>
          </Label>
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
            "Create Account"
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
          onClick={onGoogleRegister}
          type="button"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
        {/* <Button
          variant="outline"
          onClick={onFacebookRegister}
          type="button"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          disabled={isLoading}
        >
          <FaFacebook className="mr-2 h-4 w-4 text-blue-400" />
          Facebook
        </Button> */}
      </div>

      <p className="px-8 text-center text-sm text-white/70">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}