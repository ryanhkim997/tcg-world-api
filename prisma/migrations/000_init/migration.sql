-- CreateEnum
CREATE TYPE "category_enum_05e41e19" AS ENUM ('Complaint1', 'Complaint2');

-- CreateEnum
CREATE TYPE "shipping_provider_enum_7947d55e" AS ENUM ('usps', 'ups', 'fedex', 'dhl');

-- CreateEnum
CREATE TYPE "status_enum_676ca451" AS ENUM ('processing', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "status_enum_77ad13bd" AS ENUM ('processing', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "status_enum_b633788f" AS ENUM ('active', 'deleted', 'blacklisted');

-- CreateEnum
CREATE TYPE "tier_enum_a49971a4" AS ENUM ('Tier1', 'Tier2', 'Tier3', 'Tier4', 'Tier5');

-- CreateTable
CREATE TABLE "card_price_history" (
    "price" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "volume" INTEGER DEFAULT 0,
    "card_id" UUID NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_price_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pack_price_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pack_ev" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "pack_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pack_price_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_card_list_staging" (
    "id" SERIAL NOT NULL,
    "card_name" TEXT,
    "console_name" TEXT,
    "loose_price" DECIMAL DEFAULT 0,
    "price_charting_id" TEXT,
    "sales_volume" INTEGER DEFAULT 0,
    "tcg_id" TEXT,
    "date_time_updated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pokemon_card_list_staging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_sources" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "api_endpoint" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "price_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "street_address_1" TEXT NOT NULL,
    "street_address_2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "card_name" TEXT NOT NULL,
    "current_price" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "current_volume" INTEGER DEFAULT 0,
    "price_charting_id" TEXT NOT NULL,
    "release_date" DATE DEFAULT CURRENT_TIMESTAMP,
    "set_name" TEXT,
    "language" TEXT,
    "image_url" TEXT,
    "tier" "tier_enum_a49971a4" DEFAULT 'Tier1',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_pack" (
    "weight" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "card_id" UUID NOT NULL,
    "pack_id" UUID NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_pack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposit" (
    "user_id" UUID NOT NULL,
    "order_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gem_count" INTEGER NOT NULL DEFAULT 0,
    "dollar_cost_of_transaction" INTEGER NOT NULL DEFAULT 0,
    "error_reason" TEXT,
    "status" "status_enum_77ad13bd" NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_notification" (
    "id" SERIAL NOT NULL,
    "promotions" BOOLEAN NOT NULL DEFAULT false,
    "new_drops" BOOLEAN NOT NULL DEFAULT false,
    "memes" BOOLEAN NOT NULL DEFAULT false,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pack" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "theme" TEXT,
    "expected_value" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "house_margin" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "price" DECIMAL(15,2),
    "gem_price" INTEGER,
    "language" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pull_history" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "date_pulled" TIMESTAMP(6) NOT NULL,
    "card_price" DECIMAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "card_pack_id" UUID NOT NULL,

    CONSTRAINT "pull_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" UUID NOT NULL,
    "subject" TEXT,
    "description" TEXT,
    "category" "category_enum_05e41e19",
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "gem_count" INTEGER NOT NULL DEFAULT 0,
    "nonce" INTEGER DEFAULT 0,
    "client_seed" TEXT,
    "salt" TEXT,
    "status" "status_enum_b633788f" NOT NULL,
    "language" TEXT,
    "timezone" timezone_enum_1137e051,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_card" (
    "id" UUID NOT NULL,
    "current_price" DECIMAL(15,2) NOT NULL,
    "obtained_at" TIMESTAMP(6) NOT NULL,
    "card_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "price_lock_end_date" TIMESTAMP(6) NOT NULL,
    "current_price_in_gems" INTEGER NOT NULL DEFAULT 0,
    "locked_price_in_gems" INTEGER NOT NULL DEFAULT 0,
    "locked_price" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_policy_agreement" (
    "id" UUID NOT NULL,
    "version_accepted" TEXT,
    "accepted_at" TIMESTAMP(6) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_policy_agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrawal" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "shipping_address" UUID NOT NULL,
    "phone_number" TEXT,
    "shipping_cost" DECIMAL(15,2) DEFAULT 0,
    "gem_count" INTEGER NOT NULL DEFAULT 0,
    "order_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_date" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "tracking_number" TEXT,
    "error_reason" TEXT,
    "payment_provider" payment_provider_enum_1022488b NOT NULL,
    "status" "status_enum_676ca451" NOT NULL,
    "shipping_provider" "shipping_provider_enum_7947d55e",
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "price_sources_name_key" ON "price_sources"("name");

-- AddForeignKey
ALTER TABLE "card_price_history" ADD CONSTRAINT "card_price_history_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pack_price_history" ADD CONSTRAINT "pack_price_history_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "pack"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "fk_address_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "card_pack" ADD CONSTRAINT "card_pack_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "card_pack" ADD CONSTRAINT "card_pack_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "pack"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "email_notification" ADD CONSTRAINT "email_notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pull_history" ADD CONSTRAINT "pull_history_card_pack_id_fkey" FOREIGN KEY ("card_pack_id") REFERENCES "card_pack"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pull_history" ADD CONSTRAINT "pull_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_policy_agreement" ADD CONSTRAINT "user_policy_agreement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "withdrawal" ADD CONSTRAINT "fk_withdrawal_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "withdrawal" ADD CONSTRAINT "withdrawal_shipping_address_fkey" FOREIGN KEY ("shipping_address") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

