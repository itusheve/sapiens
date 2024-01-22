import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class AuthService {
    private readonly jwtService;
    private readonly userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    generateToken(user: User): Promise<string>;
    getUserFromDB(userEmail: string, password: string): Promise<User>;
}
