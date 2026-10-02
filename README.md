# EcoCheck Web

Front-end do **EcoCheck**, um questionário educativo e anônimo sobre hábitos cotidianos ligados à água, energia, resíduos, consumo e mobilidade. Projeto extensionista do curso de Análise e Desenvolvimento de Sistemas, alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU.

> O EcoCheck é uma ferramenta educativa para reflexão sobre hábitos. A pontuação **não** mede a pegada ecológica real nem constitui avaliação científica.

> 🚧 Em desenvolvimento. Este README será completado nas próximas etapas (resultados, estatísticas e deploy na Vercel).

A API fica no repositório [`ecocheck-api`](https://github.com/kevinsg1997/ecocheck-api).

## Tecnologias

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 8
- Lucide (ícones) e Fontsource (fontes servidas pelo próprio site, sem requisições a terceiros)
- Oxlint

## Estrutura

```
src/
├── components/
│   ├── brand/        # logo
│   ├── home/         # seções da página inicial
│   ├── layout/       # header e footer
│   ├── quiz/         # progresso, pergunta, região, revisão e fluxo do questionário
│   └── ui/           # botões, alertas, spinner, container, títulos de seção
├── config/env.ts     # leitura centralizada das variáveis de ambiente
├── data/             # categorias, classificações, regiões e ODS (textos oficiais da ONU Brasil)
├── hooks/            # useQuestionnaire (API) e useQuiz (estado do questionário)
├── layouts/          # layout principal com <Outlet />
├── pages/            # Home, Questionário, Resultado, Privacidade, 404
├── services/         # cliente HTTP da API e armazenamento local
├── types/            # tipos que espelham a API
├── utils/
├── index.css         # Tailwind + tokens de design (@theme)
├── router.tsx        # rotas
└── routes.ts         # caminhos das rotas
```

## Executando localmente

Pré-requisito: [Node.js](https://nodejs.org/) 22.22 ou superior.

```bash
npm install
cp .env.example .env   # no Windows: copy .env.example .env
npm run dev
```

O site abre em `http://localhost:5173`.

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Verificação de tipos + build de produção em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | Lint com Oxlint |

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API, sem barra final (ex.: `http://localhost:5080` ou `https://sua-api.up.railway.app`) |

O Vite embute o valor no build: ao alterar a variável na Vercel, é preciso gerar um novo deploy.

## Questionário

- 20 perguntas carregadas de `GET /api/questionnaire`, com barra de progresso e "Pergunta X de 20"
- Avanço automático ao escolher uma alternativa com clique ou toque; pelo teclado (setas + Tab), o avanço é manual
- Pergunta final **opcional** de região (país e, para o Brasil, estado), que não afeta a pontuação
- Tela de revisão com resumo por categoria, edição de qualquer resposta e confirmação antes do envio
- O progresso fica no `sessionStorage` do navegador e é mantido ao recarregar a página
- A pontuação é calculada pela API; o front envia apenas os ids das alternativas

### Dados guardados no navegador

| Chave | Armazenamento | Conteúdo |
|---|---|---|
| `ecocheck:quiz-progress` | sessionStorage | Respostas em andamento (apagadas após o envio) |
| `ecocheck:result` | sessionStorage | Último resultado, exibido em `/resultado` |
| `ecocheck:participated` | localStorage | Data do último envio, usada só para avisar que este navegador já participou |

Todos os acessos ao storage são protegidos: em modo privado ou com armazenamento bloqueado, o site continua funcionando, sem manter o progresso.

## Identidade visual

Os tokens de cor, fonte e sombra ficam em `src/index.css` (bloco `@theme` do Tailwind 4):

- **Neutros** com leve tom natural (`canvas`, `surface`, `ink`, `muted`, `line`)
- **Marca** em verde natural (`brand-50` … `brand-950`)
- **Uma cor por categoria**: `water` (azul), `energy` (âmbar), `waste` (verde-água), `consumption` (terracota)
- Fontes: Plus Jakarta Sans (títulos) e Inter (texto)

## Fontes dos conteúdos sobre ODS

Os nomes e os textos dos objetivos foram extraídos do site oficial [As Nações Unidas no Brasil](https://brasil.un.org/pt-br/sdgs). O EcoCheck é um projeto acadêmico independente, sem vínculo com a ONU.
