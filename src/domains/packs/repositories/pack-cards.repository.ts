import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { PackCards, Cards } from "@prisma/client";

// Type for flattened PackCard with Card data
export type FlattenedPackCard = Omit<Cards, 'currentPrice'> & 
  Omit<PackCards, 'id' | 'weight'> & {
  currentPrice: number | null;
  weight: number | null;
  packCardId: string;
};

@Injectable()
export class PackCardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(
    pagination: PaginationDto
  ): Promise<[PackCards[], number]> {
    return this.prisma.$transaction([
      this.prisma.packCards.findMany({
        take: pagination.take,
        skip: pagination.skip,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.packCards.count(),
    ]);
  }

  public async findById(id: string): Promise<PackCards | null> {
    return this.prisma.packCards.findUnique({ where: { id } });
  }

  public async findByPackId(
    packId: string
  ): Promise<FlattenedPackCard[]> {
    const packCards = await this.prisma.packCards.findMany({
      where: { packId },
      include: {
        cards: true,
      },
    });

    return packCards.map((pc) => ({
      ...pc.cards,
      currentPrice: pc.cards.currentPrice
        ? pc.cards.currentPrice.toNumber()
        : null,
      weight: pc.weight ? pc.weight.toNumber() : null,
      tier: pc.tier,
      isFeatured: pc.isFeatured,
      featuredOrder: pc.featuredOrder,
      packCardId: pc.id,
      packId: pc.packId,
      cardId: pc.cardId,
    }));
  }

  public async findByCardId(cardId: string): Promise<PackCards[]> {
    return this.prisma.packCards.findMany({ where: { cardId } });
  }
}
