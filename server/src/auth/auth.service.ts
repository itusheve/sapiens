// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, @InjectRepository(User)
  private readonly userRepository: Repository<User>) { }

  async generateToken(user:User): Promise<string> {
    const payload = { ...user };
    return this.jwtService.signAsync(payload);
  }

  async getUserFromDB(userEmail: string, password: string): Promise<User> {
    try {
      console.log(userEmail);
      console.log(password);
        const user = await  this.userRepository.findOne({ where: { email: userEmail, password: password } });
        console.log('getUserFromDB');
        console.log(user);
        return user;
    }
    catch (err) {
      throw err;
    }
  }
}