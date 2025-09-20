"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

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

interface SellerDetailsFormProps {
  sellerDetails: SellerDetails;
  isLoading: boolean;
  onDetailsChange: (details: SellerDetails) => void;
  onSubmit: () => void;
}

export default function SellerDetailsForm({
  sellerDetails,
  isLoading,
  onDetailsChange,
  onSubmit,
}: SellerDetailsFormProps) {
  const handleInputChange = (field: keyof SellerDetails, value: string) => {
    onDetailsChange({
      ...sellerDetails,
      [field]: value,
    });
  };

  const isFormValid = 
    sellerDetails.companyName &&
    sellerDetails.brandName &&
    sellerDetails.yearEstablished &&
    sellerDetails.areaOfOperation &&
    sellerDetails.productCategory &&
    sellerDetails.logistics &&
    sellerDetails.minOrderValue &&
    sellerDetails.bankAccount &&
    sellerDetails.regonKrsEin &&
    sellerDetails.address &&
    sellerDetails.phone;

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Seller Information
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">Company Name *</Label>
              <Input
                value={sellerDetails.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Your company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Brand Name *</Label>
              <Input
                value={sellerDetails.brandName}
                onChange={(e) => handleInputChange("brandName", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Your brand name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">Year Established *</Label>
              <Input
                type="number"
                value={sellerDetails.yearEstablished}
                onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="2020"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Area of Operation *</Label>
              <Select value={sellerDetails.areaOfOperation} onValueChange={(value) => handleInputChange("areaOfOperation", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poland">Poland</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="world">World</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Product Category *</Label>
            <Select value={sellerDetails.productCategory} onValueChange={(value) => handleInputChange("productCategory", value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="underwear">Underwear</SelectItem>
                <SelectItem value="hosiery">Hosiery</SelectItem>
                <SelectItem value="womens-clothing">Women's Clothing</SelectItem>
                <SelectItem value="mens-clothing">Men's Clothing</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="leather-goods">Leather Goods</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Logistics *</Label>
            <Select value={sellerDetails.logistics} onValueChange={(value) => handleInputChange("logistics", value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select logistics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pickup">Pickup from manufacturer's warehouse</SelectItem>
                <SelectItem value="courier">Courier</SelectItem>
                <SelectItem value="inpost">InPost parcel locker</SelectItem>
                <SelectItem value="manufacturer-logistics">Manufacturer's logistics</SelectItem>
                <SelectItem value="sea-freight">Sea freight</SelectItem>
                <SelectItem value="air-freight">Air freight</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">Minimum Order Value *</Label>
              <Input
                type="number"
                value={sellerDetails.minOrderValue}
                onChange={(e) => handleInputChange("minOrderValue", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="1000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Currency *</Label>
              <Select value={sellerDetails.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLN">PLN</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Bank Account Number *</Label>
            <Input
              value={sellerDetails.bankAccount}
              onChange={(e) => handleInputChange("bankAccount", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Your bank account number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">REGON/KRS/EIN *</Label>
            <Input
              value={sellerDetails.regonKrsEin}
              onChange={(e) => handleInputChange("regonKrsEin", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Company registration number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Address *</Label>
            <Textarea
              value={sellerDetails.address}
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
                value={sellerDetails.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="+48 123 456 789"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Website</Label>
              <Input
                value={sellerDetails.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="https://yourwebsite.com"
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