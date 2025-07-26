import { PrismaService } from "../../../common/prisma/prisma.service";
import { Packs } from "@prisma/client";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PacksRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(pagination: PaginationDto): Promise<[Packs[], number]> {
    return this.prisma.$transaction([
      this.prisma.packs.findMany({
        take: pagination.take,
        skip: pagination.skip,
        orderBy: { createdAt: "desc" },
        include: {
          packCards: {
            where: { isFeatured: true },
            orderBy: { featuredOrder: "asc" },
            include: {
              cards: {
                select: {
                  id: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.packs.count(),
    ]);
  }

  findById(id: string): Promise<Packs | null> {
    return this.prisma.packs.findUnique({ where: { id } });
  }
}
