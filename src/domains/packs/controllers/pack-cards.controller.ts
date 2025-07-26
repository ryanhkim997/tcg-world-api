import { Controller, Get, Param, Query } from "@nestjs/common";
import { PackCardsService } from "../services/pack-cards.service";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { PaginatedResponse } from "../../../common/interfaces/pagination-response.interface";
import { PackCards } from "@prisma/client";

@Controller("pack-cards")
export class PackCardsController {
  constructor(private readonly packCardsService: PackCardsService) {}

  @Get()
  findAllPackCards(
    @Query() pagination: PaginationDto
  ): Promise<PaginatedResponse<PackCards>> {
    return this.packCardsService.findAll(pagination);
  }

  @Get(":id")
  findPackCardById(@Param("id") id: string) {
    return this.packCardsService.findById(id);
  }

  @Get("pack/:packId")
  findPackCardsByPackId(@Param("packId") packId: string) {
    return this.packCardsService.findByPackId(packId);
  }

  @Get("card/:cardId")
  findPackCardsByCardId(@Param("cardId") cardId: string) {
    return this.packCardsService.findByCardId(cardId);
  }
}
