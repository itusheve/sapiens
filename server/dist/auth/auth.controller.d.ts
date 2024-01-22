import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getToken(req: any): Promise<any>;
    logout(req: any, response: any): void;
    login(loginDto: {
        email: string;
        password: string;
    }, response: any): Promise<{
        accessToken: string;
    }>;
    private getUserByCrededentials;
}
