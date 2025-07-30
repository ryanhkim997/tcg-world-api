import { TransformFnParams } from "class-transformer";

export const DecimalToNumber = ({
  value,
}: TransformFnParams): number | null => {
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
