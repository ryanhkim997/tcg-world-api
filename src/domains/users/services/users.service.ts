import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(data: any) {
    return this.usersRepository.create(data);
  }

  public async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }
}
