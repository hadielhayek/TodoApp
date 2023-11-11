import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { compare, hash } from 'bcryptjs'; 
import { Prisma, User } from '@prisma/client';
import { ConflictException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.prismaService.client.user.findMany();
  }
  
  async register(registerDto: RegisterDto): Promise<{ id: number; name: string; email: string }> {
    try {
      const user = await this.prismaService.client.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: await this.hashPassword(registerDto.password),
        },
      });
  
      const { password, ...userWithoutPassword } = user;
      console.log('Registration successful. User:', userWithoutPassword);
  
      const userResponse = {
        id: userWithoutPassword.id,
        name: userWithoutPassword.name,
        email: userWithoutPassword.email,
      };
  
      return userResponse;
    } catch (error) {
      console.error('Error during registration:', error);
  
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Email is already in use.');
      }
  
      throw new InternalServerErrorException('Registration failed. Please try again.');
    }
  }
  

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const user = await this.prismaService.client.user.findUnique({
        where: { email: loginDto.email },
      });
  
      console.log('User found during login:', user);
  
      if (!user) {
        console.log('User not found.');
        throw new UnauthorizedException('Invalid credentials');
      }
  
      console.log('Hashed password from the database:', user.password);
      console.log('Plain text password during login:', loginDto.password);
  
      if (!(await this.comparePasswords(loginDto.password, user.password))) {
        console.log('Password comparison result: false');
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);
  
      console.log('Login successful. Token:', token);
  
      return { token };
    } catch (error) {
      console.error('Error during login:', error);
      throw new InternalServerErrorException('Login failed. Please try again.');
    }
  }
  


  private async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    console.log('Plain text password during login:', plainTextPassword);
    console.log('Hashed password from the database:', hashedPassword);
  
    const result = await compare(plainTextPassword, hashedPassword);
  
    console.log('Result of password comparison:', result);
  
    if (!result) {
      console.log('Hashed password from the database (decoded):', Buffer.from(hashedPassword, 'hex').toString('utf-8'));
    }
  
    return result;
  }
  
  
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return hash(password, saltRounds); 
  }


}
