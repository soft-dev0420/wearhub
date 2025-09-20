import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole, UserStatus } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      $or: [
        { firebaseUid: createUserDto.firebaseUid },
        { email: createUserDto.email.toLowerCase() }
      ]
    });

    if (existingUser) {
      throw new ConflictException('User already exists with this Firebase UID or email');
    }

    // Set default status based on role
    const status = createUserDto.role === UserRole.BUYER ? UserStatus.ACTIVE : UserStatus.PENDING;

    const user = new this.userModel({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
      status,
      emailVerified: false,
      isVerified: false,
    });

    return user.save();
  }

  async findByFirebaseUid(firebaseUid: string): Promise<User> {
    const user = await this.userModel.findOne({ firebaseUid });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  async verifyUser(id: string, verificationNotes?: string): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        isVerified: true,
        status: UserStatus.ACTIVE,
        verificationNotes,
        verifiedAt: new Date(),
      },
      { new: true }
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async suspendUser(id: string, reason?: string): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        status: UserStatus.SUSPENDED,
        verificationNotes: reason,
      },
      { new: true }
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateLastLogin(firebaseUid: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { firebaseUid },
      { lastLoginAt: new Date() }
    );
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  async getPendingUsers(): Promise<User[]> {
    return this.userModel.find({ status: UserStatus.PENDING }).exec();
  }
} 