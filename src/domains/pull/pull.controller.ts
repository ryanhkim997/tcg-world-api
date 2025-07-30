import { Controller, Post, Body } from "@nestjs/common";
import {
  deterministicRandom,
  getHmacSeed,
  weightedChoice,
} from "../../core/pulling-utils";
import { PackCards } from "@prisma/client";
import { PackCardsService } from "../packs/services/pack-cards.service";
import { FlattenedPackCard } from "../packs/repositories/pack-cards.repository";

const mockPackData = {
  id: 1,
  featuredCards: [
    {
      id: 4637116,
      name: "Cynthia's Ambition #GG60 Pokemon Crown Zenith",
      weight: 20,
      price: 13.73,
      probability: 20,
    },
    {
      id: 961514,
      name: "Lillie (Full Art) - SM - Ultra Prism (SM05)",
      weight: 0.1,
      price: 444.0,
      probability: 0.1,
    },
    {
      id: 7800279,
      name: "Lisia's Appeal - #246 - SV08: Surging Sparks (SV08)",
      weight: 1,
      price: 62.83,
      probability: 1,
    },
  ],
  name: "Trainer's Paradise",
  price: 20,
  cards: [
    {
      id: 961514,
      name: "Lillie (Full Art) - SM - Ultra Prism (SM05)",
      weight: 0.1,
      price: 444.0,
      probability: 0.1,
    },
    {
      id: 2572271,
      name: "Misty's Favor (Full Art) - SM - Unified Minds (SM11)",
      weight: 0.25,
      price: 299.99,
      probability: 0.25,
    },
    {
      id: 7800279,
      name: "Lisia's Appeal - #246 - SV08: Surging Sparks (SV08)",
      weight: 1,
      price: 62.83,
      probability: 1,
    },
    {
      id: 2336171,
      name: "Marnie (Secret) - SWSH01: Sword & Shield Base Set (SWSH01)",
      weight: 5,
      price: 16.04,
      probability: 5,
    },
    {
      id: 4637116,
      name: "Cynthia's Ambition #GG60 Pokemon Crown Zenith",
      weight: 20,
      price: 13.73,
      probability: 20,
    },
    {
      id: 7800267,
      name: "Lisia's Appeal - 234/191 - SV08: Surging Sparks (SV08)",
      weight: 5,
      price: 7.29,
      probability: 5,
    },
    {
      id: 8244579,
      name: "Eri - SV: Prismatic Evolutions (PRE)",
      weight: 4,
      price: 5.46,
      probability: 4,
    },
    {
      id: 7800265,
      name: "Drayton - 232/191 - SV08: Surging Sparks (SV08)",
      weight: 7,
      price: 3.05,
      probability: 7,
    },
    {
      id: 8244585,
      name: "Raifort - SV: Prismatic Evolutions (PRE)",
      weight: 20,
      price: 1.77,
      probability: 20,
    },
    {
      id: 8321670,
      name: "Carmine (Poke Ball Pattern) - SV: Prismatic Evolutions (PRE)",
      weight: 15,
      price: 0.86,
      probability: 15,
    },
    {
      id: 7418617,
      name: "Briar - 132/142 - SV07: Stellar Crown (SV07)",
      weight: 14,
      price: 0.09,
      probability: 14,
    },
    {
      id: 5809542,
      name: "Erika's Invitation - #160 - SV: Scarlet & Violet 151",
      weight: 9.65,
      price: 0.06,
      probability: 9.65,
    },
  ],
};
// trigger dev deploy 1

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
