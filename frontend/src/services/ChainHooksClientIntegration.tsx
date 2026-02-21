import { ChainhookClient } from '@hirosystems/chainhooks-client';
export const client = new ChainhookClient({
  baseUrl: 'https://api.mainnet.hiro.so',
  apiKey: process.env.HIRO_API_KEY || ''
});
