import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Users, UserStatus } from "@prisma/client";
import { UsersService } from "../../users/services/users.service";
import { RegisterDto } from "../dtos/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  public async register(
    user: RegisterDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existing = await this.usersService.findByEmail(user.email);
    if (existing) throw new ConflictException("Email already in use");

    const hashed = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create({
      data: {
        email: user.email,
        password: hashed,
        username: user.username,
        status: UserStatus.ACTIVE,
      },
    });
    return this.login(newUser);
  }

  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }

  async login(user: { id: string; email: string }) {
    return this.generateTokens(user.id, user.email);
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET!,
      });
      return this.generateTokens(payload.sub, payload.email);
    } catch (e) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  private generateTokens(
    userId: string,
    email: string
  ): { accessToken: string; refreshToken: string } {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET!,
      expiresIn: "15m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }
}
