"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

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

interface BuyerDetailsFormProps {
  buyerDetails: BuyerDetails;
  isLoading: boolean;
  onDetailsChange: (details: BuyerDetails) => void;
  onSubmit: () => void;
}

export default function BuyerDetailsForm({
  buyerDetails,
  isLoading,
  onDetailsChange,
  onSubmit,
}: BuyerDetailsFormProps) {
  const handleInputChange = (field: keyof BuyerDetails, value: string) => {
    onDetailsChange({
      ...buyerDetails,
      [field]: value,
    });
  };

  const isFormValid = 
    buyerDetails.companyName &&
    buyerDetails.businessType &&
    buyerDetails.companyId &&
    buyerDetails.address &&
    buyerDetails.phone;

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Buyer Information
        </h1>
        <p className="text-sm text-white/70">
          Please provide your business details for verification
        </p>
      </div>

      <Card className="bg-white/10 border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-white">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white font-medium">Company Name *</Label>
            <Input
              value={buyerDetails.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Your company name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Type of Business *</Label>
            <Select value={buyerDetails.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brick-mortar">Brick and mortar store</SelectItem>
                <SelectItem value="online-store">Online store</SelectItem>
                <SelectItem value="both">Brick and mortar + online store</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Company ID (KRS/EIN) *</Label>
            <Input
              value={buyerDetails.companyId}
              onChange={(e) => handleInputChange("companyId", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Company registration number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Address *</Label>
            <Textarea
              value={buyerDetails.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Your business address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">Phone Number *</Label>
              <Input
                value={buyerDetails.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="+48 123 456 789"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Website</Label>
              <Input
                value={buyerDetails.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">Facebook Profile</Label>
              <Input
                value={buyerDetails.facebook}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Instagram Profile</Label>
              <Input
                value={buyerDetails.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="https://instagram.com/yourpage"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors" 
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...
          </>
        ) : (
          "Complete Registration"
        )}
      </Button>
    </div>
  );
}