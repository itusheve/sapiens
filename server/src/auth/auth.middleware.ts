import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const user = req.cookies['access_token'];
    if (user) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  }
}
