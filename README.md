# JN Smartphone — landing page

Landing page da JN Smartphone (Queimadas de Jurema — PE). CEO: Jailton Nanes.
React + TypeScript + Vite, sem backend.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/ (é ela que vai para o Vercel)
```

No Vercel: framework **Vite**, build `npm run build`, saída `dist`.

## Onde editar

- **WhatsApp:** `src/data/site.ts` → `WHATSAPP` (DDI + DDD, só números, ex.: `5587999999999`).
  Enquanto estiver vazio, todos os botões abrem o Direct do Instagram.
- **Endereço, Instagram, Facebook e horários:** `src/data/site.ts` (`STORE`, `HOURS`).
  O selo "Aberta agora / Fechada agora" usa o horário de Pernambuco.
- **Mensagens pré-preenchidas:** `src/data/site.ts` (`MSG`).
- **Fotos e vídeos:** `public/img/` e `public/video/`, todos em 4:5, já sem textos e preços
  sobrepostos. A lista de cada carrossel fica em `src/data/site.ts`.
- **Textos das seções:** `src/components/Sections.tsx`.
- **Mapa 3D do envio:** `src/components/BrazilMap.tsx` (rotas e destinos dos aviões em `ROUTES`).
- **Cores, tipografia e animações:** variáveis no topo de `src/index.css`.
- **Intro (JN → SMARTPHONE → coroa → maçã):** `src/components/Intro.tsx`. Toca uma vez por
  sessão, pode ser pulada e não aparece para quem ativa a redução de movimento.

## Capa do link (WhatsApp, Instagram, Facebook)

A capa é `public/og.jpg` (1200×630). No Vercel o endereço é preenchido automaticamente.
Com domínio próprio, crie a variável `SITE_URL` (ex.: `https://www.jnsmartphone.com.br`) e faça
um novo deploy. Se trocar a imagem, mude o `?v=1` em `index.html`.

## Créditos

Contorno dos estados: [SVG Maps](https://github.com/VictorCazanave/svg-maps) (CC BY 4.0).
