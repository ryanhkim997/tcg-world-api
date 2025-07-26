import { PrismaService } from "../../../common/prisma/prisma.service";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { PackCards } from "@prisma/client";

export class PackCardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination: PaginationDto): Promise<[PackCards[], number]> {
    return this.prisma.$transaction([
      this.prisma.packCards.findMany({
        take: pagination.take,
        skip: pagination.skip,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.packCards.count(),
    ]);
  }

  findById(id: string): Promise<PackCards | null> {
    return this.prisma.packCards.findUnique({ where: { id } });
  }

  findByPackId(packId: string): Promise<PackCards[]> {
    return this.prisma.packCards.findMany({ where: { packId } });
  }

  findByCardId(cardId: string): Promise<PackCards[]> {
    return this.prisma.packCards.findMany({ where: { cardId } });
  }
}
