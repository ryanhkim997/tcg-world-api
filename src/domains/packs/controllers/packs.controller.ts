import { Controller, Get, Param, Query } from "@nestjs/common";
import { PacksService } from "../services/packs.service";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { PaginatedResponse } from "../../../common/interfaces/pagination-response.interface";
import { Packs } from "@prisma/client";
import { PackResponseDto } from "../dtos/pack-response.dto";
import { plainToInstance } from "class-transformer";

@Controller("packs")
export class PacksController {
  constructor(private readonly packsService: PacksService) {}

  @Get()
  async findAllPacks(
    @Query() pagination: PaginationDto
  ): Promise<PaginatedResponse<PackResponseDto>> {
    const result = await this.packsService.findAll(pagination);

    return {
      ...result,
      data: plainToInstance(PackResponseDto, result.data, {
        excludeExtraneousValues: true,
      }),
    };
  }
  @Get(":id")
  findPackById(@Param("id") id: string) {
    return this.packsService.findById(id);
  }
}
