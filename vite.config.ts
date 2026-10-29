import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// WhatsApp e redes sociais só mostram a capa com URL absoluta.
// No Vercel o domínio de produção vem de VERCEL_PROJECT_PRODUCTION_URL;
// para um domínio próprio, defina SITE_URL (ex.: https://www.jnsmartphone.com.br).
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  ''
).replace(/\/$/, '')

const socialMeta = (): Plugin => ({
  name: 'social-meta',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl || '.'),
})

export default defineConfig({
  base: './',
  plugins: [react(), socialMeta()],
  // a textura de fundo (10KB) vai embutida no CSS, sem requisição extra
  build: { assetsInlineLimit: 16384 },
})
