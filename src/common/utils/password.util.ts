import * as bcrypt from 'bcrypt';
import { BCRYPT_ROUNDS } from '../constants/app.constants';

export class PasswordUtil {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  static async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
