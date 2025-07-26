import { Expose, Transform, Type } from "class-transformer";

export class CardSummaryDto {
  @Expose()
  id!: string;

  @Expose()
  imageUrl!: string;
}

export class PackResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Transform(({ obj }) => obj.packCards?.map((pc: any) => pc.cards))
  @Type(() => CardSummaryDto)
  @Expose()
  featuredCards!: CardSummaryDto[];
}
