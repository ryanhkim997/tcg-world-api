import { Packs } from "@prisma/client";
import { PacksRepository } from "../repositories/packs.repository";
import { Injectable } from "@nestjs/common";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { PaginatedResponse } from "../../../common/interfaces/pagination-response.interface";

@Injectable()
export class PacksService {
  constructor(private readonly packsRepository: PacksRepository) {}

  async findAll(pagination: PaginationDto): Promise<PaginatedResponse<Packs>> {
    const [data, total] = await this.packsRepository.findAll(pagination);

    return {
      data,
      total,
      page: pagination.page ?? 1,
      limit: pagination.limit ?? 10,
    };
  }

  findById(id: string): Promise<Packs | null> {
    return this.packsRepository.findById(id);
  }
}
