// src/index.ts
import express from 'express';
import cors from 'cors';
import { deterministicRandom, getHmacSeed, weightedChoice } from './utils/pulling-utils';
import { Card } from './types';

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const cards: Card[] = [
  { name: 'Common Card A', weight: 60 },
  { name: 'Common Card B', weight: 60 },
  { name: 'Uncommon Card', weight: 25 },
  { name: 'Rare Card', weight: 10 },
  { name: 'Ultra Rare Card', weight: 1 },
];

app.post('/api/open-pack', (req, res) => {
  const { clientSeed, nonce } = req.body;
  const serverSeed = process.env.SERVER_SEED || 'super_secret_seed';

  const hmac = getHmacSeed(serverSeed, clientSeed, nonce);
  const rng = deterministicRandom(hmac);
  const pack = weightedChoice(rng, cards, 5);

  res.json({ pack, hmac });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});