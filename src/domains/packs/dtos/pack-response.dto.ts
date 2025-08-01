import { Expose, Transform, Type } from "class-transformer";
import { DecimalToNumber } from "../../../common/transformers/decimal-to-number";
import { Cards, PackCards } from "@prisma/client";

export class CardSummaryDto {
  @Expose()
  id!: string;

  @Expose()
  imageUrl!: string | null;
}

export class PacksResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  @Transform(DecimalToNumber)
  @Type(() => Number)
  price!: number | null;

  @Expose()
  @Type(() => Number)
  gemPrice!: number | null;

  @Expose()
  @Transform(
    ({ obj }) =>
      obj.packCards?.map((pc: PackCards & { cards: Cards }) => ({
        id: pc.cards?.id,
        imageUrl: pc.cards?.imageUrl,
      })) || []
  )
  @Type(() => CardSummaryDto)
  featuredCards!: CardSummaryDto[];
}
