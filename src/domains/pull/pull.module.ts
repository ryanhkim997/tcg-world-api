import { Module } from "@nestjs/common";
import { PullController } from "./pull.controller";
import { PacksModule } from "../packs/packs.module";

@Module({
  imports: [PacksModule],
  controllers: [PullController],
})
export class PullModule {}
