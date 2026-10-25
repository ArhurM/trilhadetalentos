import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Configuração de CORS para permitir requisições do GitHub Pages
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Opcional: substitua '*' pela URL exata do seu GitHub Pages por segurança
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // GET: Retorna o ranking atual do Vercel KV
    if (req.method === 'GET') {
      const ranking = await kv.get('leaderboard') || [];
      return res.status(200).json(ranking);
    }

    // POST: Adiciona uma nova pontuação ao ranking
    if (req.method === 'POST') {
      const { nome, sobrenome, pontos } = req.body;

      if (!nome || typeof pontos !== 'number' || pontos <= 0) {
        return res.status(400).json({ error: 'Dados de pontuação inválidos.' });
      }

      let ranking = await kv.get('leaderboard') || [];

      // Adiciona o novo jogador
      ranking.push({
        nome: nome.trim(),
        sobrenome: sobrenome ? sobrenome.trim() : '',
        pontos: parseInt(pontos),
        data: new Date().toLocaleDateString('pt-BR')
      });

      // Ordena do maior para o menor e mantém apenas o Top 10
      ranking.sort((a, b) => b.pontos - a.pontos);
      ranking = ranking.slice(0, 10);

      // Salva de volta no Vercel KV
      await kv.set('leaderboard', ranking);

      return res.status(200).json({ success: true, ranking });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error('Erro na API de Ranking:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

