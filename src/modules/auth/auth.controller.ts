import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // Service sera utilisé lors de l'implémentation des endpoints
  // @ts-ignore - Service sera utilisé plus tard
  constructor(private readonly authService: AuthService) {}
}
