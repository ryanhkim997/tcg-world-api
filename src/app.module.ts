import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { PullModule } from "./domains/pull/pull.module";
import { HealthCheckModule } from "./domains/health-check/health-check.module";
import { PacksModule } from "./domains/packs/packs.module";
import { PrismaModule } from "./common/prisma/prisma.module";

@Module({
  imports: [
    DatabaseModule,
    PullModule,
    HealthCheckModule,
    PacksModule,
    PrismaModule,
  ],
})
export class AppModule {}
