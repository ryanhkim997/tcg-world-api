import { Module } from "@nestjs/common";
import { PacksController } from "./controllers/packs.controller";
import { PacksService } from "./services/packs.service";
import { PacksRepository } from "./repositories/packs.repository";
import { PackCardsController } from "./controllers/pack-cards.controller";
import { PackCardsService } from "./services/pack-cards.service";
import { PackCardsRepository } from "./repositories/pack-cards.repository";
import { PrismaService } from "../../common/prisma/prisma.service";

@Module({
  controllers: [PacksController, PackCardsController],
  providers: [
    PacksService,
    PacksRepository,
    PackCardsService,
    PackCardsRepository,
    PrismaService,
  ],
  exports: [PacksService, PackCardsService],
})
export class PacksModule {}
