-- AlterEnum
BEGIN;
CREATE TYPE "tier_enum_a49971a4_new" AS ENUM ('TIER_1', 'TIER_2', 'TIER_3', 'TIER_4', 'TIER_5');
ALTER TABLE "pack_cards" ALTER COLUMN "tier" DROP DEFAULT;
ALTER TABLE "pack_cards" ALTER COLUMN "tier" TYPE "tier_enum_a49971a4_new" USING ("tier"::text::"tier_enum_a49971a4_new");
ALTER TYPE "tier_enum_a49971a4" RENAME TO "tier_enum_a49971a4_old";
ALTER TYPE "tier_enum_a49971a4_new" RENAME TO "tier_enum_a49971a4";
DROP TYPE "tier_enum_a49971a4_old";
ALTER TABLE "pack_cards" ALTER COLUMN "tier" SET DEFAULT 'TIER_1';
COMMIT;

-- AlterTable
ALTER TABLE "pack_cards" ALTER COLUMN "tier" SET DEFAULT 'TIER_1';

