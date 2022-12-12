import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UserInterface } from '../interfaces/user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { EnviromentVariablesEnum } from '../../../core/dtos/enviroment.variables.enum';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }

  async validate(email: string, password: string): Promise<UserInterface> {
    const user = await this.userService.getByEmail(email);


    //if (user && await bcrypt.compare(password, user.password))
    //  return user;
    //else
    //  return null;
    if (!!user && !user.password) return user;
    if (user && password == user.password) return user;
    else return null;
  }

  createToken(userId: string, email: string) {
    const user: JwtPayload = { userId, email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: this.configService.get(EnviromentVariablesEnum.JWT_EXPIRATION),
      accessToken,
    };
  }
}
