# EcoCheck

**Questionário educativo e anônimo sobre hábitos sustentáveis do dia a dia.**

O EcoCheck convida as pessoas a refletir sobre como usam água e energia, como lidam com resíduos e como consomem e se deslocam. Depois de responder a 20 perguntas rápidas, a pessoa vê seu resultado, recebe dicas práticas e compara seus hábitos com a média de todos os participantes, filtrando por país e estado.

> O EcoCheck é uma ferramenta **educativa**, criada para estimular a reflexão sobre hábitos cotidianos. A pontuação **não** mede a pegada ecológica real de ninguém e **não** constitui diagnóstico ou avaliação científica.

Projeto extensionista do curso de **Análise e Desenvolvimento de Sistemas**, eixo **Meio Ambiente e Saúde**.

| Repositório | Conteúdo |
|---|---|
| [`ecocheck-web`](https://github.com/kevinsg1997/ecocheck-web) (este) | Front-end em React + TypeScript, publicado na Vercel |
| [`ecocheck-api`](https://github.com/kevinsg1997/ecocheck-api) | API REST em ASP.NET Core + PostgreSQL, publicada no Railway |

---

## Sumário

- [O problema](#o-problema)
- [Objetivo](#objetivo)
- [Projeto Extensionista](#projeto-extensionista)
- [ODS relacionados](#ods-relacionados)
- [Funcionalidades](#funcionalidades)
- [Privacidade](#privacidade)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Executando localmente](#executando-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Deploy](#deploy)
- [Decisões de design e acessibilidade](#decisões-de-design-e-acessibilidade)

---

## O problema

Grande parte do impacto ambiental de uma pessoa está em hábitos pequenos e repetidos: o tempo do banho, a luz esquecida acesa, o aparelho em espera, o lixo sem separação, a sacola descartável. Esses hábitos raramente são percebidos, porque não há um momento em que a pessoa pare para olhar para a própria rotina.

Ao mesmo tempo, conteúdos sobre sustentabilidade costumam ser longos, abstratos ou alarmistas, o que afasta o público em vez de engajá-lo.

## Objetivo

Oferecer uma experiência **curta, acessível e sem julgamentos** que:

1. leve a pessoa a **refletir** sobre hábitos concretos do cotidiano;
2. mostre de forma clara **onde ela já vai bem** e **onde pode melhorar**, com dicas práticas;
3. mostre **como a comunidade está**, com estatísticas agregadas e anônimas, incentivando a mudança coletiva;
4. faça tudo isso **sem coletar dados pessoais**.

## Projeto Extensionista

O EcoCheck foi desenvolvido como atividade de extensão universitária: um projeto que leva o conhecimento produzido no curso para além da sala de aula, em benefício da comunidade. Ele contribui para a educação ambiental e para a conscientização da seguinte forma:

- **Educação ambiental acessível:** qualquer pessoa, em qualquer dispositivo, pode participar em poucos minutos, sem cadastro.
- **Aprendizado pela reflexão:** em vez de apenas informar, o questionário faz a pessoa olhar para a própria rotina, e cada resposta vira um ponto de atenção.
- **Orientação prática:** o resultado traz dicas concretas e simples de aplicar para cada hábito com pontuação baixa.
- **Dimensão coletiva:** as estatísticas gerais mostram os hábitos mais e menos praticados pela comunidade, por país e estado, e podem apoiar ações de conscientização em escolas, empresas e grupos.
- **Responsabilidade com os dados:** o projeto demonstra, na prática, como coletar informações para fins estatísticos respeitando a privacidade e a LGPD.
- **Formação técnica:** o desenvolvimento aplica conteúdos do curso de ADS (front-end, APIs REST, banco de dados, segurança, testes e deploy em nuvem) a um problema real.

## ODS relacionados

O projeto se relaciona com os seguintes Objetivos de Desenvolvimento Sustentável da Agenda 2030 da ONU. Os textos oficiais exibidos no site foram extraídos de [As Nações Unidas no Brasil](https://brasil.un.org/pt-br/sdgs).

| ODS | Relação com o EcoCheck |
|---|---|
| **3** Saúde e Bem-Estar | Mobilidade ativa e ambientes preservados como parte do bem-estar |
| **4** Educação de Qualidade | O próprio projeto: educação ambiental aberta a todos |
| **6** Água Potável e Saneamento | Perguntas sobre consumo, desperdício e reaproveitamento de água |
| **7** Energia Limpa e Acessível | Perguntas sobre uso eficiente de energia |
| **12** Consumo e Produção Responsáveis | Reciclagem, reutilização, descartáveis e consumo consciente |
| **13** Ação Contra a Mudança Global do Clima | Hábitos de energia e transporte |
| **14** Vida na Água | Descarte correto de resíduos e proteção de rios e oceanos |
| **15** Vida Terrestre | Descarte de resíduos e cuidado com áreas naturais |

O EcoCheck é um projeto acadêmico independente, sem vínculo com a ONU.

## Funcionalidades

**Página inicial:** apresentação do projeto, como funciona, categorias avaliadas, ODS (com o texto oficial e o link da fonte) e privacidade.

**Questionário (`/questionario`)**
- 20 perguntas em 4 categorias: Água, Energia, Resíduos e Consumo e Mobilidade
- Barra de progresso, "Pergunta X de 20", avanço automático ao tocar numa alternativa e navegação por teclado
- Opção **"Não se aplica"** onde faz sentido (ex.: quem não usa ar-condicionado), que não penaliza a pontuação
- Pergunta final **opcional** de região (país e, para o Brasil, estado)
- Revisão com edição de respostas e confirmação antes do envio
- Progresso salvo no navegador: recarregar a página não apaga as respostas

**Resultado (`/resultado`)**
- Percentual, classificação educativa e pontuação
- Mensagem personalizada a partir do melhor e do pior desempenho por categoria
- Gráfico "Você × média geral" por categoria
- Pontos fortes e sugestões de melhoria com dicas práticas
- Compartilhamento do resultado, sem nenhum dado pessoal

**Estatísticas gerais (`/estatisticas` e no fim do resultado)**
- Participantes, média geral, classificação mais comum
- Média por categoria e distribuição das classificações
- Hábitos mais praticados e maiores oportunidades de melhoria
- Distribuição das respostas de cada pergunta
- Participação por região e **filtro por país e estado** (`?pais=BR&estado=SP`)

**Classificações** (faixas educativas, não diagnósticas):

| Faixa | Classificação |
|---|---|
| 0–20% | Começando a jornada |
| 21–40% | Primeiros passos |
| 41–60% | No caminho |
| 61–80% | Bons hábitos |
| 81–100% | Hábitos inspiradores |

## Privacidade

- **Sem cadastro, login ou dados pessoais:** nada de nome, e-mail, telefone, CPF, endereço, cidade ou localização precisa.
- A região é **opcional** e se limita a país e estado.
- O IP é usado **apenas em memória** no servidor, para limitar envios automatizados, e nunca é gravado.
- Estatísticas são **somente agregadas**. A distribuição por pergunta e os dados de cada região só aparecem a partir de **5 participantes**, para que poucas respostas não revelem escolhas individuais.
- Sem cookies de rastreamento, publicidade ou fontes externas: as fontes tipográficas são servidas pelo próprio site.
- A página `/privacidade` explica tudo isso aos participantes, incluindo a relação com a LGPD (art. 12, dados anonimizados).

## Tecnologias

**Front-end (este repositório)**
- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 8
- Recharts 3 (gráficos)
- Lucide (ícones) e Fontsource (fontes locais)
- Oxlint

**Back-end ([`ecocheck-api`](https://github.com/kevinsg1997/ecocheck-api))**
- C# / ASP.NET Core Web API (.NET 9)
- Entity Framework Core 9 + Npgsql + migrations
- PostgreSQL
- xUnit

**Infraestrutura**
- Vercel (front-end), Railway (API e PostgreSQL), GitHub (versionamento e deploy contínuo)

## Arquitetura

```
┌──────────────┐   HTTPS    ┌──────────────────────┐
│  Navegador   │ ─────────► │  Vercel              │
│ (celular,    │ ◄───────── │  React SPA (estático)│
│  desktop)    │            └──────────────────────┘
└──────┬───────┘
       │ fetch para VITE_API_URL (HTTPS + CORS)
       ▼
┌──────────────────────────────┐        ┌──────────────────┐
│  Railway                     │        │  Railway         │
│  ASP.NET Core Web API        │ ─────► │  PostgreSQL      │
│  · valida e calcula o result.│  rede  │  · respostas     │
│  · rate limiting, CORS       │ privada│    anônimas      │
│  · estatísticas com cache    │        └──────────────────┘
└──────────────────────────────┘
```

**Fluxo de uma participação**

1. O front busca as perguntas (`GET /api/questionnaire`). A pontuação das alternativas não é exposta.
2. A pessoa responde; o progresso fica no `sessionStorage`.
3. O front envia apenas os ids das alternativas (`POST /api/responses`).
4. A API valida, **calcula a pontuação no servidor**, salva de forma anônima e devolve o resultado.
5. O front mostra o resultado e busca as estatísticas agregadas (`GET /api/statistics`, com filtro de região opcional).

## Estrutura do projeto

```
src/
├── components/
│   ├── brand/        # logo
│   ├── charts/       # gráfico de barras (Recharts) e cartão com legenda e tabela
│   ├── home/         # seções da página inicial
│   ├── layout/       # header e footer
│   ├── quiz/         # progresso, pergunta, região, revisão e fluxo do questionário
│   ├── result/       # compartilhamento e listas de hábitos
│   ├── statistics/   # "Como estamos indo juntos?", filtro de região, explorador de perguntas
│   └── ui/           # botões, alertas, spinner, anel de pontuação, container
├── config/env.ts     # leitura centralizada das variáveis de ambiente
├── data/             # categorias, classificações, hábitos/dicas, regiões e ODS
├── hooks/            # useQuestionnaire, useQuiz, useStatistics
├── layouts/          # layout principal
├── pages/            # Home, Questionário, Resultado, Estatísticas, Privacidade, 404
├── services/         # cliente HTTP da API e armazenamento local
├── types/            # tipos que espelham os contratos da API
├── utils/
├── index.css         # Tailwind + tokens de design (@theme)
├── router.tsx        # rotas (páginas com gráficos carregadas sob demanda)
└── routes.ts         # caminhos das rotas
```

## Executando localmente

Para o fluxo completo, rode também a API: veja o [README do `ecocheck-api`](https://github.com/kevinsg1997/ecocheck-api#executando-localmente).

**Pré-requisito:** [Node.js](https://nodejs.org/) 22.22 ou superior.

```bash
git clone https://github.com/kevinsg1997/ecocheck-web.git
cd ecocheck-web
npm install
cp .env.example .env      # no Windows (PowerShell): copy .env.example .env
npm run dev
```

O site abre em `http://localhost:5173` e usa a API em `http://localhost:5080` (valor do `.env.example`).

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Verificação de tipos + build de produção em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | Lint com Oxlint |

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API, **sem barra no final**. Local: `http://localhost:5080`. Produção: `https://SUA-API.up.railway.app` |

O Vite embute o valor no momento do build. Ao alterar a variável na Vercel, é necessário gerar um **novo deploy**. A URL da API é lida em um único lugar (`src/config/env.ts`) e usada pelo cliente HTTP (`src/services/apiClient.ts`).

## Deploy

A ordem recomendada é: **1) banco e API no Railway → 2) front-end na Vercel → 3) liberar o domínio da Vercel no CORS da API.**

### 1. API e banco no Railway

Siga o passo a passo do [README da API](https://github.com/kevinsg1997/ecocheck-api#deploy-no-railway). Ao final, você terá uma URL como `https://ecocheck-api-production.up.railway.app`, e `/health` deve responder `Healthy`.

### 2. Front-end na Vercel

1. Acesse [vercel.com](https://vercel.com), entre com o GitHub e clique em **Add New → Project**.
2. Importe o repositório **`ecocheck-web`**. A Vercel detecta o **Vite** automaticamente (build `npm run build`, saída `dist`).
3. Em **Environment Variables**, adicione:
   ```
   VITE_API_URL = https://SUA-API.up.railway.app
   ```
   (sem barra no final; marque os ambientes Production e Preview)
4. Clique em **Deploy**. Ao terminar, anote o domínio, por exemplo `https://ecocheck.vercel.app`.

O arquivo `vercel.json` já configura:
- o redirecionamento das rotas do React Router para `index.html` (sem ele, acessar `/resultado` diretamente daria 404);
- headers de segurança (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

### 3. Liberar o front-end no CORS da API

No Railway, no serviço da API, altere a variável:

```
Cors__AllowedOrigins = https://ecocheck.vercel.app
```

Use o domínio exato da Vercel, com `https://` e sem barra no final. Para mais de um domínio, separe por vírgula. O Railway faz um novo deploy automaticamente.

### Deploy contínuo

Depois da configuração inicial, cada `git push` na branch `main` publica uma nova versão: os pushes no `ecocheck-web` vão para a Vercel e os do `ecocheck-api` para o Railway.

### Checklist pós-deploy

- [ ] `https://SUA-API.up.railway.app/health` responde `Healthy`
- [ ] O site abre e o questionário carrega as perguntas (se aparecer erro de conexão, confira `VITE_API_URL` e `Cors__AllowedOrigins`)
- [ ] Enviar um questionário leva à página de resultado
- [ ] `/estatisticas` mostra o participante registrado
- [ ] Acessar `https://SEU-SITE.vercel.app/privacidade` diretamente funciona (rewrite do SPA)

## Decisões de design e acessibilidade

- **Mobile-first:** botões grandes, navegação fixa no rodapé durante o questionário e gráficos com rótulos que quebram linha.
- **Identidade visual natural e discreta:** neutros com tom natural, verde de marca e uma cor por categoria, definidos como tokens no `@theme` do Tailwind (`src/index.css`).
- **Gráficos acessíveis:** barras com o valor escrito na ponta, tooltip e versão em tabela ("Ver dados em tabela"). As cores foram validadas quanto a contraste e daltonismo.
- **Acessibilidade:** HTML semântico, `fieldset`/`legend` nas perguntas, foco visível, foco movido a cada nova pergunta, link "Pular para o conteúdo" e respeito à preferência de **movimento reduzido**.
- **Desempenho:** as páginas com gráficos são carregadas sob demanda; a página inicial não carrega a biblioteca de gráficos.
- **Resiliência:** mensagens de erro amigáveis, possibilidade de tentar novamente e funcionamento mesmo com o armazenamento do navegador bloqueado.
