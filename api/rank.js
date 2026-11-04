import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

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
      for (let i = 0; i < rawRanking.length; i += 2) {
        const fullName = rawRanking[i];
        const [nome, ...resto] = fullName.split(' ');
        const sobrenome = resto.join(' ');

        ranking.push({
          nome: nome || '',
          sobrenome: sobrenome || '',
          pontos: Number(rawRanking[i + 1])
        });
      }

      return res.status(200).json(ranking);
    }

    // 2. ADICIONAR / ATUALIZAR PONTUAÇÃO OU RESET (POST)
    if (req.method === 'POST') {
      const { nome, sobrenome, pontos, reset } = req.body || {};

      // Opção de Reset via POST (opcional para facilitar chamadas no front-end)
      if (reset === true) {
        await redis.del('leaderboard');
        return res.status(200).json({ success: true, message: 'Ranking resetado com sucesso!' });
      }

      if (!nome || typeof pontos !== 'number') {
        return res.status(400).json({ error: 'Dados de pontuação inválidos.' });
      }

      const nomeCompleto = `${nome.trim()} ${sobrenome ? sobrenome.trim() : ''}`.trim();

      // ZADD com { gt: true }: Atualiza a pontuação APENAS se o novo valor for MAIOR que o existente
      await redis.zadd('leaderboard', { score: Number(pontos), member: nomeCompleto }, { gt: true });

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
