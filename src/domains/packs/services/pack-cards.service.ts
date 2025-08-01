import {
  PackCardsRepository,
  FlattenedPackCard,
} from "../repositories/pack-cards.repository";
import { Injectable } from "@nestjs/common";
import { PackCards } from "@prisma/client";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { PaginatedResponse } from "../../../common/interfaces/pagination-response.interface";

@Injectable()
export class PackCardsService {
  constructor(private readonly packCardsRepository: PackCardsRepository) {}

  public async findAll(
    pagination: PaginationDto
  ): Promise<PaginatedResponse<PackCards>> {
    const [data, total] = await this.packCardsRepository.findAll(pagination);

    return {
      data,
      total,
      page: pagination.page ?? 1,
      limit: pagination.limit ?? 10,
    };
  }

  public async findById(id: string): Promise<PackCards | null> {
    return this.packCardsRepository.findById(id);
  }

  public async findByPackId(packId: string): Promise<FlattenedPackCard[]> {
    return this.packCardsRepository.findByPackId(packId);
  }

  public async findByCardId(cardId: string): Promise<PackCards[]> {
    return this.packCardsRepository.findByCardId(cardId);
  }
}
