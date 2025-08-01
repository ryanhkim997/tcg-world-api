import crypto from "crypto";
import seedrandom from "seedrandom";
import { Card } from "../common/types";
import { PackCards } from "@prisma/client";
import { FlattenedPackCard } from "../domains/packs/repositories/pack-cards.repository";

export function getHmacSeed(
  serverSeed: string,
  clientSeed: string,
  nonce: number
): string {
  const message = `${clientSeed}:${nonce}`;
  return crypto.createHmac("sha256", serverSeed).update(message).digest("hex");
}

export function deterministicRandom(seedHex: string): () => number {
  const seedInt = parseInt(seedHex.slice(0, 15), 16); // slice to avoid overflow
  const rng = seedrandom(seedInt.toString());
  return () => rng();
}

export function weightedChoice(
  rng: () => number,
  items: FlattenedPackCard[],
  k = 1
): FlattenedPackCard[] {
  const weights = items.map((c) => c.weight || 0);
  const cumWeights = weights.map(
    (
      (sum) => (value) =>
        (sum += value)
    )(0)
  );
  const total = cumWeights[cumWeights.length - 1];
  const results: FlattenedPackCard[] = [];

  for (let i = 0; i < k; i++) {
    const x = rng() * total;
    const index = cumWeights.findIndex((cw) => x < cw);
    results.push(items[index]);
  }

  return results;
}
