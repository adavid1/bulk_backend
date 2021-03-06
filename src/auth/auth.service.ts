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
    if (user && passMatch && !user.guest) {
      const { password, ...result } = user;
      return result;
    }
    return null
  }

  async login(user: any) {
    let userFetched = await this.userService.getUserByName(user.username);
    const payload = { username: userFetched.username, userid: userFetched.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

