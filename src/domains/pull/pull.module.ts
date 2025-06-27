import { Module } from "@nestjs/common";
import { PullController } from "./pull.controller";

@Module({
  controllers: [PullController],
})
export class PullModule {}
