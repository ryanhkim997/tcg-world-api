import { Controller, Get, Param, Query } from "@nestjs/common";
import { PacksService } from "../services/packs.service";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { PaginatedResponse } from "../../../common/interfaces/pagination-response.interface";
import { PacksResponseDto } from "../dtos/pack-response.dto";
import { plainToInstance } from "class-transformer";
import { PackWithCardsDto } from "../dtos/pack-with-cards.dto";

@Controller("packs")
export class PacksController {
  constructor(private readonly packsService: PacksService) {}

  @Get()
  async findAllPacks(
    @Query() pagination: PaginationDto
  ): Promise<PaginatedResponse<PacksResponseDto>> {
    const result = await this.packsService.findAll(pagination);

    return {
      ...result,
      data: plainToInstance(PacksResponseDto, result.data, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<PackWithCardsDto | null> {
    const pack = await this.packsService.findByIdWithFeatured(id);
    return plainToInstance(PackWithCardsDto, pack, {
      excludeExtraneousValues: true,
    });
  }
}
