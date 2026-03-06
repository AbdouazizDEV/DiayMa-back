import { faker } from '@faker-js/faker';
import type { Prisma, Role } from '@prisma/client';

export interface UserFactoryOptions {
  role?: Role;
  isActive?: boolean;
}

export function makeUserCreateInput(
  options: UserFactoryOptions = {},
): Prisma.UserCreateInput {
  const role = options.role ?? 'acheteur';
  const isActive = options.isActive ?? true;

  return {
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    password: faker.internet.password({ length: 16 }),
    role,
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    isActive,
  };
}

