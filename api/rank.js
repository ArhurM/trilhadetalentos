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
      
      if (rawRanking && Array.isArray(rawRanking)) {
        // Se o Upstash retornar num array plano [membro, score, membro, score...]
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
        } 
        // Se o Upstash retornar em formato de objetos [{member, score}]
        else {
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

      // Opção de Reset via POST
      if (reset === true) {
        await redis.del('leaderboard');
        return res.status(200).json({ success: true, message: 'Ranking resetado com sucesso!' });
      }

      // Converte e valida se os pontos são um número válido (aceita string numérica ou number)
      const pontosNum = Number(pontos);
      if (!nome || isNaN(pontosNum)) {
        return res.status(400).json({ error: 'Dados de pontuação inválidos.' });
      }

      const nomeCompleto = `${nome.trim()} ${sobrenome ? sobrenome.trim() : ''}`.trim();

      // ZADD com { gt: true }: Atualiza apenas se o novo valor for MAIOR que o existente
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
