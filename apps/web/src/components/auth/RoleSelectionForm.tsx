"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ShoppingBag } from "lucide-react";

interface RoleSelectionFormProps {
  onRoleSelect: (role: "seller" | "buyer") => void;
}

export default function RoleSelectionForm({ onRoleSelect }: RoleSelectionFormProps) {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Choose Your Role
        </h1>
        <p className="text-sm text-white/70">
          Select whether you want to sell or buy products on WearHub
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className="bg-white/10 border-white/20 text-white cursor-pointer hover:bg-white/20 transition-colors"
          onClick={() => onRoleSelect("seller")}
        >
          <CardHeader className="text-center">
            <Store className="h-12 w-12 mx-auto text-blue-400 mb-2" />
            <CardTitle className="text-white">Seller</CardTitle>
            <CardDescription className="text-white/70">
              Sell your products to retailers and stores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-white/80 space-y-2">
              <li>• List your products</li>
              <li>• Manage inventory</li>
              <li>• Reach B2B buyers</li>
              <li>• Set pricing tiers</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          className="bg-white/10 border-white/20 text-white cursor-pointer hover:bg-white/20 transition-colors"
          onClick={() => onRoleSelect("buyer")}
        >
          <CardHeader className="text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-blue-400 mb-2" />
            <CardTitle className="text-white">Buyer</CardTitle>
            <CardDescription className="text-white/70">
              Purchase products for your store or business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-white/80 space-y-2">
              <li>• Browse products</li>
              <li>• Bulk ordering</li>
              <li>• Track orders</li>
              <li>• Manage suppliers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}