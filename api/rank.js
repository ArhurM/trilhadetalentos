import { Redis } from '@upstash/redis';

// Inicialização segura compatível com Upstash direto ou Vercel KV
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  // Configuração de CORS para permitir requisições do GitHub Pages
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 1. LER O RANKING (GET)
    if (req.method === 'GET') {
      const rawRanking = await redis.zrange('leaderboard', 0, 9, { rev: true, withScores: true });
      
      const ranking = [];
      
      if (rawRanking && Array.isArray(rawRanking)) {
        if (typeof rawRanking[0] === 'string') {
          for (let i = 0; i < rawRanking.length; i += 2) {
            const fullName = rawRanking[i];
            const [nome, ...resto] = (fullName || '').split(' ');
            const sobrenome = resto.join(' ');

            ranking.push({
              nome: nome || '',
              sobrenome: sobrenome || '',
              pontos: Number(rawRanking[i + 1]) || 0
            });
          }
        } else {
          rawRanking.forEach(item => {
            if (item && item.member) {
              const [nome, ...resto] = item.member.split(' ');
              ranking.push({
                nome: nome || '',
                sobrenome: resto.join(' ') || '',
                pontos: Number(item.score) || 0
              });
            }
          });
        }
      }

      return res.status(200).json(ranking);
    }

    // 2. ADICIONAR / ATUALIZAR PONTUAÇÃO OU RESET (POST)
    if (req.method === 'POST') {
      const { nome, sobrenome, pontos, reset } = req.body || {};

      if (reset === true) {
        await redis.del('leaderboard');
        return res.status(200).json({ success: true, message: 'Ranking resetado com sucesso!' });
      }

      const pontosNum = Number(pontos);
      if (!nome || isNaN(pontosNum)) {
        return res.status(400).json({ error: 'Dados de pontuação inválidos.' });
      }

      const nomeCompleto = `${nome.trim()} ${sobrenome ? sobrenome.trim() : ''}`.trim();

      await redis.zadd('leaderboard', { score: pontosNum, member: nomeCompleto }, { gt: true });

      return res.status(200).json({ success: true, message: 'Pontuação processada!' });
    }

    // 3. RESETAR O RANKING (DELETE)
    if (req.method === 'DELETE') {
      await redis.del('leaderboard');
      return res.status(200).json({ success: true, message: 'Ranking resetado com sucesso!' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error('Erro na API de Ranking:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}
