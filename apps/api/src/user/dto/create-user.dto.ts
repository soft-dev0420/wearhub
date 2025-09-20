import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export enum UserRole {
  SELLER = 'seller',
  BUYER = 'buyer',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export class CreateUserDto {
  @IsString()
  firebaseUid: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  // Common fields
  @IsString()
  companyName: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  website?: string;

  // Seller specific fields
  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsString()
  yearEstablished?: string;

  @IsOptional()
  @IsString()
  areaOfOperation?: string;

  @IsOptional()
  @IsString()
  productCategory?: string;

  @IsOptional()
  @IsString()
  logistics?: string;

  @IsOptional()
  @IsNumber()
  minOrderValue?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  bankAccount?: string;

  @IsOptional()
  @IsString()
  regonKrsEin?: string;

  // Buyer specific fields
  @IsOptional()
  @IsString()
  businessType?: string;

  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  instagram?: string;
} 