// Banco de perguntas focado em Valores e Cultura Organizacional
const BANCO_PERGUNTAS = {
    geral: [
        // --- BLOCO 1: PERGUNTAS FÁCEIS (1 a 5) ---
        {
            nivel: 1,
            pergunta: "Qual valor diz respeito a ter atitude firme, não desistir diante dos obstáculos e manter a constância?",
            opcoes: ["Determinação e Persistência", "Fazer Bem Feito Sempre", "Confiança", "Humildade"],
            correta: 0
        },
        {
            nivel: 1,
            pergunta: "Acreditar na capacidade da equipe, demonstrar transparência e delegar com segurança reforça qual pilar?",
            opcoes: ["Foco no Básico", "Confiança", "Meritocracia", "Cumprir o Combinado"],
            correta: 1
        },
        {
            nivel: 1,
            pergunta: "A postura de reconhecer os próprios limites, aprender com os outros e estar aberto a feedbacks reflete qual princípio?",
            opcoes: ["Intolerância à Desperdício", "Responsabilidade Social", "Humildade", "Confiança"],
            correta: 2
        },
        {
            nivel: 1,
            pergunta: "Quando um líder delega uma tarefa importante sem microgerenciar, demonstrando que acredita na competência do liderado, ele está construindo:",
            opcoes: ["Confiança", "Humildade", "Meritocracia", "Foco no Básico"],
            correta: 0
   	    },
    	{
            nivel: 1,
            pergunta: "A base de qualquer equipe de alto desempenho que permite o compartilhamento aberto de ideias e erros sem medo de retaliação é a:",
            opcoes: ["Cumprir o Combinado", "Confiança", "Intolerância à Desperdício", "Determinação e Persistência"],
            correta: 1
        },
        {
            nivel: 1,
            pergunta: "Admitir publicamente um erro de planejamento e buscar aprender com ele em vez de procurar culpados demonstra grande:",
            opcoes: ["Meritocracia", "Foco no Básico", "Humildade", "Fazer Bem Feito Sempre"],
            correta: 2
        },
        {
            nivel: 1,
            pergunta: "Estar disposto a ouvir sugestões de profissionais em início de carreira, reconhecendo que boas ideias vêm de qualquer lugar, é um sinal de:",
            opcoes: ["Humildade", "Confiança", "Cumprir o Combinado", "Prática do Elogio e da Crítica Construtiva"],
            correta: 0
        },
        {
            nivel: 2,
            pergunta: "Executar as tarefas do dia a dia com excelência, sem atalhos e com máxima atenção à qualidade demonstra:",
            opcoes: ["Cumprir o Combinado", "Fazer Bem Feito Sempre", "Humildade", "Prática do Elogio e da Crítica Construtiva"],
            correta: 1
        },
        {
            nivel: 2,
            pergunta: "Garantir a pontualidade nas entregas e honrar rigorosamente prazos e compromissos firmados é o exemplo claro de:",
            opcoes: ["Determinação e Persistência", "Responsabilidade Social", "Confiança", "Cumprir o Combinado"],
            correta: 3
        },
        {
            nivel: 2,
            pergunta: "Desenvolver projetos de apoio à comunidade do entorno e promover inclusão social por meio da empresa reflete o compromisso com a:",
            opcoes: ["Responsabilidade Social", "Intolerância à Desperdício", "Meritocracia", "Determinação e Persistência"],
            correta: 0
        },
        {
            nivel: 2,
            pergunta: "Adotar práticas de redução de impacto ambiental e sustentabilidade nas operações diárias da organização faz parte das diretrizes de:",
            opcoes: ["Foco no Básico", "Responsabilidade Social", "Fazer Bem Feito Sempre", "Confiança"],
            correta: 1
        },
        {
            nivel: 2,
            pergunta: "Antes de buscar ferramentas complexas ou inovações rebuscadas, garantir que os processos fundamentais funcionem perfeitamente é manter o:",
            opcoes: ["Fazer Bem Feito Sempre", "Meritocracia", "Foco no Básico", "Cumprir o Combinado"],
            correta: 2
        },
        {
            nivel: 2,
            pergunta: "Evitar desviar o foco da operação principal para modismos corporativos passageiros é uma aplicação direta de manter o:",
            opcoes: ["Foco no Básico", "Intolerância à Desperdício", "Determinação e Persistência", "Humildade"],
            correta: 0
        },

        // --- BLOCO 2: PERGUNTAS MÉDIAS (6 a 10) ---
        {
            nivel: 2,
            pergunta: "Promover ações sustentáveis, apoiar a comunidade local e impactar positivamente a sociedade é o foco da:",
            opcoes: ["Responsabilidade Social", "Foco no Básico", "Meritocracia", "Intolerância à Desperdício"],
            correta: 0
        },
        {
            nivel: 3,
            pergunta: "Evitar retrabalho, otimizar recursos financeiros e combater o uso ineficiente do tempo da equipe significa aplicar a:",
            opcoes: ["Intolerância à Desperdício", "Humildade", "Determinação e Persistência", "Confiança"],
            correta: 0
        },
        {
            nivel: 3,
            pergunta: "Garantir que a operação essencial funcione perfeitamente antes de tentar inovações complexas é o pilar de:",
            opcoes: ["Foco no Básico", "Fazer Bem Feito Sempre", "Meritocracia", "Cumprir o Combinado"],
            correta: 0
        },
        {
            nivel: 3,
            pergunta: "Qual prática visa reconhecer publicamente o bom desempenho e orientar em particular de forma respeitosa para o crescimento do colega?",
            opcoes: ["Prática do Elogio e da Crítica Construtiva", "Humildade", "Confiança", "Responsabilidade Social"],
            correta: 0
        },
        {
            nivel: 3,
            pergunta: "Realizar uma entrega com atenção máxima aos mínimos detalhes, independentemente de quem irá inspecioná-la, caracteriza o princípio de:",
            opcoes: ["Cumprir o Combinado", "Fazer Bem Feito Sempre", "Confiança", "Prática do Elogio e da Crítica Construtiva"],
            correta: 1
        },
        {
            nivel: 3,
            pergunta: "Recusar-se a entregar um trabalho com falhas conhecidas, preferindo refiná-lo até atingir o padrão máximo de excelência, denota:",
            opcoes: ["Meritocracia", "Fazer Bem Feito Sempre", "Responsabilidade Social", "Foco no Básico"],
            correta: 1
        },
        {
            nivel: 3,
            pergunta: "Garantir que as promoções e bonificações na empresa sejam baseadas estritamente no desempenho e nos resultados alcançados fortalece a:",
            opcoes: ["Confiança", "Meritocracia", "Humildade", "Determinação e Persistência"],
            correta: 1
        },
        {
            nivel: 3,
            pergunta: "Um sistema de avaliação de desempenho transparente e justo, onde quem se destaca é recompensado, baseia-se no conceito de:",
            opcoes: ["Meritocracia", "Intolerância à Desperdício", "Foco no Básico", "Cumprir o Combinado"],
            correta: 0
        },
        {
            nivel: 4,
            pergunta: "Repensar processos continuamente para eliminar custos desnecessários e insumos excedentes é uma forma de demonstrar:",
            opcoes: ["Foco no Básico", "Intolerância à Desperdício", "Humildade", "Fazer Bem Feito Sempre"],
            correta: 1
        },

        // --- BLOCO 3: PERGUNTAS DIFÍCEIS (11 a 15) ---
        {
            nivel: 4,
            pergunta: "Reconhecer, premiar e promover colaboradores com base estritamente em seus resultados e entregas mensuráveis reflete o pilar da:",
            opcoes: ["Confiança", "Responsabilidade Social", "Meritocracia", "Cumprir o Combinado"],
            correta: 2
        },
        {
            nivel: 4,
            pergunta: "Quando a equipe enfrenta um projeto longo com sucessivas falhas, mas continua ajustando a estratégia até atingir a meta, ela demonstra:",
            opcoes: ["Prática do Elogio e da Crítica Construtiva", "Determinação e Persistência", "Meritocracia", "Humildade"],
            correta: 1
        },
        {
            nivel: 4,
            pergunta: "Assumir um prazo com um cliente interno ou externo e mover todos os esforços para entregá-lo no dia estipulado é honrar o princípio de:",
            opcoes: ["Fazer Bem Feito Sempre", "Confiança", "Cumprir o Combinado", "Prática do Elogio e da Crítica Construtiva"],
            correta: 2
        },
        {
            nivel: 4,
            pergunta: "Quando surgem imprevistos, avisar imediatamente as partes afetadas e renegociar prazos com transparência em vez de se omitir é uma forma de:",
            opcoes: ["Cumprir o Combinado", "Responsabilidade Social", "Humildade", "Determinação e Persistência"],
            correta: 0
        },
        {
            nivel: 4,
            pergunta: "Auditar processos periodicamente para identificar e cortar gastos supérfluos, materiais inutilizados e ociosidade demonstra uma postura de:",
            opcoes: ["Foco no Básico", "Intolerância à Desperdício", "Meritocracia", "Fazer Bem Feito Sempre"],
            correta: 1
        },
        {
            nivel: 4,
            pergunta: "O cuidado rigoroso para não desperdiçar o tempo da equipe em reuniões improdutivas e sem pauta reflete a cultura de:",
            opcoes: ["Intolerância à Desperdício", "Confiança", "Humildade", "Cumprir o Combinado"],
            correta: 0
        },
        {
            nivel: 5,
            pergunta: "Não abaixar a cabeça diante de uma meta trimestral difícil, buscando alternativas e trabalhando com afinco até o último dia, exemplifica:",
            opcoes: ["Determinação e Persistência", "Responsabilidade Social", "Foco no Básico", "Meritocracia"],
            correta: 0
        },
        {
            nivel: 5,
            pergunta: "Manter o ânimo firme e a resiliência após um revés comercial importante, recomeçando com mais aprendizado, exige:",
            opcoes: ["Humildade", "Fazer Bem Feito Sempre", "Determinação e Persistência", "Confiança"],
            correta: 2
        },
        {
            nivel: 5,
            pergunta: "Destacar o bom trabalho de um colega em público e apontar pontos de melhoria de forma privada e respeitosa descreve perfeitamente a:",
            opcoes: ["Prática do Elogio e da Crítica Construtiva", "Cumprir o Combinado", "Meritocracia", "Intolerância à Desperdício"],
            correta: 0
        },
        {
            nivel: 5,
            pergunta: "Dar um feedback direcionado a comportamentos e processos visando o desenvolvimento profissional do outro sem ofensas é a essência da:",
            opcoes: ["Confiança", "Prática do Elogio e da Crítica Construtiva", "Foco no Básico", "Humildade"],
            correta: 1
        },
        {
            nivel: 5,
            pergunta: "Contar com os colegas para cobrir uma urgência sabendo que eles farão o melhor possível baseia-se na mútua:",
            opcoes: ["Meritocracia", "Confiança", "Fazer Bem Feito Sempre", "Responsabilidade Social"],
            correta: 1
        },
        {
            nivel: 5,
            pergunta: "Reconhecer que não se sabe tudo sobre um novo projeto tecnológico e pedir ajuda a especialistas da equipe mostra:",
            opcoes: ["Humildade", "Foco no Básico", "Cumprir o Combinado", "Intolerância à Desperdício"],
            correta: 0
        },
        {
            nivel: 5,
            pergunta: "Promover ativamente a diversidade, equidade e inclusão de grupos minorizados na contratação de novos talentos apoia diretamente a:",
            opcoes: ["Determinação e Persistência", "Responsabilidade Social", "Prática do Elogio e da Crítica Construtiva", "Confiança"],
            correta: 1
        },
        {
            nivel: 5,
            pergunta: "Ao dar um feedback difícil sobre uma entrega incorreta, buscar o aperfeiçoamento da pessoa sem ataques pessoais é a aplicação direta da:",
            opcoes: ["Prática do Elogio e da Crítica Construtiva", "Humildade", "Confiança", "Responsabilidade Social"],
            correta: 0
        },
        {
            nivel: 5,
            pergunta: "Priorizar a consistência no atendimento ao cliente interno e externo, garantindo padrão elevado constante, alinha-se ao princípio de:",
            opcoes: ["Intolerância à Desperdício", "Fazer Bem Feito Sempre", "Meritocracia", "Foco no Básico"],
            correta: 1
        },
        {
            nivel: 5,
            pergunta: "Evitar a burocracia excessiva e concentrar os esforços no que traz valor direto e imediato para o cliente trata-se de manter o:",
            opcoes: ["Foco no Básico", "Cumprir o Combinado", "Confiança", "Responsabilidade Social"],
            correta: 0
        },
        {
            nivel: 6,
            pergunta: "Dominar profundamente as rotinas diárias e o atendimento essencial antes de inventar novas etapas complexas é aplicar o:",
            opcoes: ["Foco no Básico", "Fazer Bem Feito Sempre", "Meritocracia", "Humildade"],
            correta: 0
        },
        {
            nivel: 6,
            pergunta: "Revisar o próprio código, artefato ou relatório detalhadamente antes de enviá-lo para garantir zero erros é o lema de:",
            opcoes: ["Cumprir o Combinado", "Fazer Bem Feito Sempre", "Intolerância à Desperdício", "Responsabilidade Social"],
            correta: 1
        },
        {
            nivel: 6,
            pergunta: "Avaliar os colaboradores com base em metas claras, transparentes e métricas objetivas de entrega garante a justiça da:",
            opcoes: ["Meritocracia", "Confiança", "Determinação e Persistência", "Foco no Básico"],
            correta: 0
        },
        {
            nivel: 6,
            pergunta: "Entregar os relatórios e demandas semanais rigorosamente dentro do horário estabelecido demonstra profissionalismo e:",
            opcoes: ["Cumprir o Combinado", "Humildade", "Prática do Elogio e da Crítica Construtiva", "Intolerância à Desperdício"],
            correta: 0
        },
        {
            nivel: 6,
            pergunta: "Otimizar recursos digitais e fluxos de dados para consumir menos banda de servidor e eletricidade é um reflexo prático da:",
            opcoes: ["Responsabilidade Social", "Intolerância à Desperdício", "Foco no Básico", "Meritocracia"],
            correta: 1
        },
        {
            nivel: 6,
            pergunta: "Estudar, testar e praticar exaustivamente até dominar uma nova tecnologia ou ferramenta exigida pelo negócio demonstra alta:",
            opcoes: ["Fazer Bem Feito Sempre", "Determinação e Persistência", "Confiança", "Cumprir o Combinado"],
            correta: 1
        },
        {
            nivel: 6,
            pergunta: "Evitar fofocas pelos corredores e falar diretamente de forma transparente com a pessoa envolvida para alinhar pontos de melhoria faz parte da:",
            opcoes: ["Prática do Elogio e da Crítica Construtiva", "Humildade", "Intolerância à Desperdício", "Meritocracia"],
            correta: 0
        },

        // --- PERGUNTA DO MILHÃO (16) ---
        {
            nivel: 6,
            pergunta: "VALENDO 1 MILHÃO DE PONTOS: O pilar onde o desempenho individual e o alinhamento cultural são os únicos critérios para evolução profissional é denominado:",
            opcoes: ["Humildade", "Meritocracia", "Responsabilidade Social", "Determinação e Persistência"],
            correta: 1
        }
    ]
};
