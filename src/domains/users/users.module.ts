import { Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersRepository } from "./repositories/users.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
