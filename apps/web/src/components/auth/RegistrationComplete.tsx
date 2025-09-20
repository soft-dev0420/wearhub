"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface RegistrationCompleteProps {
  onGoToProfile: () => void;
}

export default function RegistrationComplete({ onGoToProfile }: RegistrationCompleteProps) {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] text-center">
      <div className="flex flex-col space-y-2">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/50">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Registration Complete!
        </h1>
        <p className="text-sm text-white/70">
          Your account has been created successfully. You can now start using WearHub.
        </p>
      </div>

      <Button 
        onClick={onGoToProfile}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
      >
        Go to Profile
      </Button>
    </div>
  );
}