import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  SELLER = 'seller',
  BUYER = 'buyer',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  firebaseUid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ required: true, enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Prop({ default: false })
  isAdministrator: boolean;

  @Prop({ default: false })
  setList: boolean;

  @Prop({ default: false })
  emailVerified: boolean;

  // Common fields
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  website?: string;

  // Seller specific fields
  @Prop()
  brandName?: string;

  @Prop()
  yearEstablished?: string;

  @Prop()
  areaOfOperation?: string;

  @Prop()
  productCategory?: string;

  @Prop()
  logistics?: string;

  @Prop()
  minOrderValue?: number;

  @Prop({ default: 'EUR' })
  currency?: string;

  @Prop()
  bankAccount?: string;

  @Prop()
  regonKrsEin?: string;

  // Buyer specific fields
  @Prop()
  businessType?: string;

  @Prop()
  companyId?: string;

  @Prop()
  facebook?: string;

  @Prop()
  instagram?: string;

  // Verification fields
  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  verificationNotes?: string;

  @Prop()
  verifiedAt?: Date;

  @Prop()
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User); 
