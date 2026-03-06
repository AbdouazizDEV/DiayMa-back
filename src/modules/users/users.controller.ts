import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  // Service sera utilisé lors de l'implémentation des endpoints
  // @ts-ignore - Service sera utilisé plus tard
  constructor(private readonly usersService: UsersService) {}
}
