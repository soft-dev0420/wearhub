import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseEnumPipe,
  ConflictException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { User, UserStatus } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        message: 'User registered successfully',
        user: user,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Registration failed');
    }
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('role/:role')
  async getUsersByRole(
    @Param('role', new ParseEnumPipe(UserRole)) role: UserRole
  ): Promise<User[]> {
    return this.userService.getUsersByRole(role);
  }

  @Get('pending')
  async getPendingUsers(): Promise<User[]> {
    return this.userService.getPendingUsers();
  }

  @Get('firebase/:firebaseUid')
  async getUserByFirebaseUid(@Param('firebaseUid') firebaseUid: string): Promise<User> {
    return this.userService.findByFirebaseUid(firebaseUid);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<User>
  ): Promise<User> {
    return this.userService.update(id, updateData);
  }

  @Put(':id/verify')
  async verifyUser(
    @Param('id') id: string,
    @Body('verificationNotes') verificationNotes?: string
  ): Promise<User> {
    return this.userService.verifyUser(id, verificationNotes);
  }

  @Put(':id/suspend')
  async suspendUser(
    @Param('id') id: string,
    @Body('reason') reason?: string
  ): Promise<User> {
    return this.userService.suspendUser(id, reason);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}