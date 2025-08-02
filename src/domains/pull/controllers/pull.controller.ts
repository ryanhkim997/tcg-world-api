import { Controller, Post, Body } from "@nestjs/common";
import {
  deterministicRandom,
  getHmacSeed,
  weightedChoice,
} from "../../../core/pulling-utils";
import { PackCardsService } from "../../packs/services/pack-cards.service";
import { FlattenedPackCard } from "../../packs/repositories/pack-cards.repository";

@Controller("pull")
export class PullController {
  constructor(private readonly packCardsService: PackCardsService) {}

  @Post()
  async pullCard(
    @Body()
    body: {
      userId: string;
      packId: string;
      clientSeed: string;
      nonce: number;
    }
  ): Promise<{ pulledCard: FlattenedPackCard; hash: string; nonce: number }> {
    const { clientSeed, nonce, packId } = body;
    const serverSeed = process.env.SERVER_SEED || "super_secret_seed";

    const packCards = await this.packCardsService.findByPackId(packId);

    if (!packCards || packCards.length === 0) {
      throw new Error("Pack not found or has no cards");
    }

    const hmac = getHmacSeed(serverSeed, clientSeed, nonce);
    const rng = deterministicRandom(hmac);
    const chosen = weightedChoice(rng, packCards, 12);

    return {
      pulledCard: chosen[0],
      hash: hmac,
      nonce,
    };
  }
}
