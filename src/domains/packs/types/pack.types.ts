import { Prisma } from "@prisma/client";

export type Pack = {};

export type PackWithCards = Prisma.PacksGetPayload<{
  include: {
    packCards: true;
  };
}>;
