import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { PullModule } from "./domains/pull/pull.module";
import { HealthCheckModule } from "./domains/health-check/health-check.module";

@Module({
  imports: [DatabaseModule, PullModule, HealthCheckModule],
})
export class AppModule {}
