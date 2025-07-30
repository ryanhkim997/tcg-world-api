import { Exclude, Expose, Transform, Type } from "class-transformer";
import { Cards, PackCards } from "@prisma/client";
import { DecimalToNumber } from "../../../common/transformers/decimal-to-number";

// Helper function to convert decimal values to numbers
const convertDecimal = (value: any): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  // Handle Prisma Decimal type
  if (value && typeof value.toNumber === "function") {
    return value.toNumber();
  }

  // Handle regular numbers
  if (typeof value === "number") {
    return value;
  }

  // Handle string numbers
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }

  return null;
};

// Helper function to flatten pack card with card data
const flattenPackCard = (pc: PackCards & { cards: Cards }) => ({
  ...pc.cards,
  // Convert decimal fields to numbers
  currentPrice: convertDecimal(pc.cards.currentPrice),
  weight: convertDecimal(pc.weight),
  // Pack-specific fields
  tier: pc.tier,
  isFeatured: pc.isFeatured,
  featuredOrder: pc.featuredOrder,
  packCardId: pc.id,
  packId: pc.packId,
  cardId: pc.cardId,
});

// Helper function to get all cards from packCards
const transformAllCards = ({ obj }: any) =>
  obj.packCards?.map(flattenPackCard) || [];

// Helper function to get featured cards only
const transformFeaturedCards = ({ obj }: any) =>
  obj.packCards
    ?.filter((pc: PackCards & { cards: Cards }) => pc.isFeatured)
    .sort(
      (a: PackCards & { cards: Cards }, b: PackCards & { cards: Cards }) =>
        (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0)
    )
    .map(flattenPackCard) || [];

export class PackWithCardsDto {
  @Expose()
  @Type(() => String)
  id!: string;

  @Expose()
  @Type(() => String)
  name!: string;

  @Expose()
  @Type(() => String)
  description!: string | null;

  @Expose()
  @Type(() => String)
  theme!: string | null;

  @Expose()
  @Transform(DecimalToNumber)
  @Type(() => Number)
  expectedValue!: number | null;

  @Expose()
  @Transform(DecimalToNumber)
  @Type(() => Number)
  houseMargin!: number | null;

  @Expose()
  @Transform(DecimalToNumber)
  @Type(() => Number)
  price!: number | null;

  @Expose()
  @Type(() => Number)
  gemPrice!: number | null;

  @Expose()
  @Type(() => String)
  language!: string | null;

  @Expose()
  @Type(() => Date)
  createdAt!: Date | null;

  @Expose()
  @Type(() => Date)
  updatedAt!: Date | null;

  @Exclude()
  packCards!: (PackCards & { cards: Cards })[];

  @Expose()
  @Transform(transformAllCards)
  cards!: any[];

  @Expose()
  @Transform(transformFeaturedCards)
  featuredCards!: any[];
}
