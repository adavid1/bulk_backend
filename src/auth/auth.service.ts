import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
      
    const user = await this.userService.
                        getUserByName(username);
    let passMatch = bcrypt.compareSync(pass, user.password);
    console.log("OIUI "+passMatch);
    if (user && passMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

