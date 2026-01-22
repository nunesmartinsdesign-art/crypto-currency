import fs from 'fs';
import https from 'https';

const coins = [
  'bitcoin',
  'ethereum',
  'tether',
  'binancecoin',
  'ripple',
  'usd-coin',
  'solana',
  'tron',
  'staked-ether',
  'dogecoin',
  'toncoin',
  'cardano',
];

const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=' +
  coins.join(',') +
  '&vs_currencies=usd&include_24hr_change=true';

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', reject);
  });
}

(async () => {
  const prices = await fetchJSON(API_URL);

  let items = '';

  for (const id of coins) {
    const name = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const price = prices[id]?.usd ?? 0;
    const change = prices[id]?.usd_24h_change ?? 0;

    items += `
      <item>
        <title>${name}</title>
        <description>Preço: $${price.toFixed(
          4
        )} — Variação 24h: ${change.toFixed(2)}%</description>
        <link>https://www.coingecko.com/en/coins/${id}</link>
      </item>
    `;
  }

  const rss = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Criptomoedas - Top 12</title>
        <link>https://example.com/crypto-feed</link>
        <description>Feed automático com as 12 criptomoedas mais valiosas</description>
        <language>pt</language>
        ${items}
      </channel>
    </rss>
  `;

  fs.writeFileSync('crypto-feed.xml', rss.trim());
  console.log('Feed atualizado com sucesso!');
})();

setInterval(() => {
  console.log("Atualizando feed...");
  gerarFeed(); // a função que gera o XML
}, 10000);


