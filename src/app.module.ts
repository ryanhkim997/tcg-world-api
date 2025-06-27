import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { PullModule } from "./domains/pull/pull.module";

@Module({
  imports: [DatabaseModule, PullModule],
})
export class AppModule {}
