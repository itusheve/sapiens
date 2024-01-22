// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, Res, HttpStatus, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('token')
  async getToken(@Req() req: any){
      const cookies = req.cookies;
      if(cookies['access_token']){
        return cookies['access_token'];
      }
      return null;
  }
  @Get('logout')
  logout(@Req() req:any,@Res() response){
    response.clearCookie('access_token');
    response.send({message:'logout'})
  }
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }, @Res() response: any): Promise<{ accessToken: string }> {
    // Replace this with your actual authentication logic (e.g., verify username and password against a database)
    try {
      const user = await this.getUserByCrededentials(loginDto.email, loginDto.password);
      if (!user) {
        return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
      }
      // If the user is valid, generate and return an access token
      const accessToken = await this.authService.generateToken(user);
      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true, // Enable for HTTPS
        sameSite: 'None'
      });
      return response.status(HttpStatus.OK).json({ accessToken });
    }
    catch (error) {
      console.error('Authentication error:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  private async getUserByCrededentials(username: string, password: string): Promise<User | null> {
    try {
      return  await this.authService.getUserFromDB(username, password);
    } catch (e) {
      throw e;
    }

  }
}
