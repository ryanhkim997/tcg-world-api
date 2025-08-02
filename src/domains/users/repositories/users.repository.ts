import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { Users } from "@prisma/client";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Users) {
    return this.prisma.users.create({ data });
  }

  public async findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }
}
