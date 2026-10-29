// Conteúdo central da JN Smartphone.
// Para atualizar contatos, horários ou mídias, edite somente este arquivo.

const B = import.meta.env.BASE_URL
export const asset = (p: string) => `${B}${p}`

/* ---------- Contato ---------- */
// WhatsApp com DDI + DDD, só números (ex.: '5587999999999').
// Enquanto estiver vazio, os botões abrem o Direct do Instagram.
export const WHATSAPP = ''

export const STORE = {
  name: 'JN Smartphone',
  ceo: 'Jailton Nanes',
  address: 'Rua João Nanes, 51, Santo Antônio das Queimadas, Jurema — PE, CEP 55480-000',
  short: 'Queimadas de Jurema — PE',
  instagram: 'https://www.instagram.com/jn_smartphone/',
  instagramHandle: '@jn_smartphone',
  facebook: 'https://www.facebook.com/p/JN-Smartphones-61573612105522/',
}

// 0 = domingo … 6 = sábado. Horário de Pernambuco.
export const HOURS: { day: number; label: string; open: string; close: string }[] = [
  { day: 1, label: 'Segunda-feira', open: '09:00', close: '18:00' },
  { day: 2, label: 'Terça-feira', open: '09:00', close: '18:00' },
  { day: 3, label: 'Quarta-feira', open: '09:00', close: '18:00' },
  { day: 4, label: 'Quinta-feira', open: '09:00', close: '18:00' },
  { day: 5, label: 'Sexta-feira', open: '09:00', close: '18:00' },
  { day: 6, label: 'Sábado', open: '09:00', close: '12:00' },
  { day: 0, label: 'Domingo', open: '09:00', close: '12:00' },
]

export const contactUrl = (text?: string) =>
  WHATSAPP
    ? `https://api.whatsapp.com/send/?phone=${WHATSAPP}${text ? `&text=${encodeURIComponent(text)}` : '&text'}&type=phone_number&app_absent=0`
    : 'https://ig.me/m/jn_smartphone'

export const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export const MSG = {
  geral: 'Olá! Vim pelo site e gostaria de falar com a JN Smartphone.',
  iphone: 'Olá! Gostaria de consultar os modelos e valores de iPhone disponíveis na JN Smartphone.',
  seminovo: 'Olá! Gostaria de consultar os iPhones seminovos disponíveis na JN Smartphone.',
  envio: 'Olá! Não sou de Jurema e gostaria de saber como funciona o envio para a minha cidade.',
  parcelamento: 'Olá! Gostaria de simular o parcelamento de um aparelho na JN Smartphone.',
  categoria: (c: string) => `Olá! Gostaria de consultar os modelos e valores de ${c} disponíveis na JN Smartphone.`,
}

/* ---------- Mídias (todas as fotos e vídeos em 4:5) ---------- */
export type Photo = { src: string; alt: string }
export type Clip = { src: string; poster: string; alt: string }
const p = (n: string, alt: string): Photo => ({ src: asset(`img/${n}.webp`), alt })
const v = (n: string, alt: string): Clip => ({ src: asset(`video/${n}.mp4`), poster: asset(`video/${n}.jpg`), alt })

export const HERO = {
  main: p('produtos/iphone-14-cores', 'Cinco iPhone 14 em cores diferentes abertos em leque na mão'),
  second: p('produtos/iphone-17-pro-max', 'Três caixas de iPhone 17 Pro Max brancas na mão'),
}

// Destaque de iPhones: carrossel de fotos
export const IPHONE_PHOTOS: Photo[] = [
  p('produtos/iphone-17-caixas', 'Duas caixas de iPhone, preta e verde, com o letreiro JN ao fundo'),
  p('produtos/iphone-17e', 'Caixa de iPhone com tela roxa na mão'),
  p('produtos/iphone-16-pro-max', 'Dois iPhone 16 Pro Max cinza na mão'),
  p('produtos/iphone-15-pro-max', 'iPhone 15 Pro Max natural e branco na mão'),
  p('produtos/iphone-15-pro', 'iPhone 15 Pro branco e preto na mão'),
  p('produtos/iphone-15-caixas', 'Duas caixas de iPhone 15 azul'),
  p('produtos/iphone-14-pro-max', 'Três iPhone 14 Pro Max: prata, preto e roxo'),
  p('produtos/iphone-14-pro', 'Três iPhone 14 Pro: azul, dourado e preto'),
  p('produtos/iphone-12', 'iPhone 12 branco na mão'),
  p('produtos/iphone-caixa-vermelha', 'Caixa de iPhone vermelho sobre a bancada'),
]

// Destaque de iPhones: carrossel de vídeos
export const IPHONE_CLIPS: Clip[] = [
  v('iphone-18-pro-max', 'Três caixas de iPhone Pro Max em cores diferentes'),
  v('iphone-17-pro-max', 'Duas caixas de iPhone 17 Pro Max azul abertas'),
  v('iphone-16-pro', 'iPhone 16 Pro titânio branco girando na mão'),
  v('iphone-15-cores', 'iPhone 15 em quatro cores abertos em leque'),
  v('iphone-14-plus', 'iPhone 14 Plus em azul e branco'),
  v('iphone-14-cores', 'iPhone 14 em amarelo, roxo e preto'),
  v('iphone-13-cores', 'iPhone 13 em verde, vermelho, azul e preto'),
  v('iphone-12-pro-max', 'iPhone 12 Pro Max azul-pacífico'),
  v('iphone-11', 'iPhone 11 preto na mão'),
  v('ipad', 'Caixa de iPad na mão'),
]

// Além do iPhone: fotos
export const MORE_PHOTOS: Photo[] = [
  p('produtos/macbook', 'Caixa de MacBook na mão'),
  p('produtos/apple-watch-ultra', 'Apple Watch Ultra 2 no pulso'),
  p('produtos/apple-watch-se', 'Caixa de Apple Watch SE na mão'),
  p('produtos/redmi-pad', 'Caixa do Redmi Pad 2 em frente ao logo Xiaomi da loja'),
]

export const CLIENT_PHOTOS = {
  big: p('clientes/caixas-letreiro', 'Caixas de iPhone separadas para clientes em frente ao letreiro JN Smartphone'),
  small: [
    p('clientes/redmi-note-sacola', 'Redmi Note 11 e chaveiro JN sobre a sacola da loja'),
    p('clientes/redmi-sacola', 'Redmi 9i sobre a sacola da JN Smartphone'),
  ],
}
export const CLIENT_CLIPS: Clip[] = [
  v('cliente-iphone', 'Cliente segurando a caixa do iPhone novo em frente ao painel JN'),
  v('unboxing', 'Unboxing de um iPhone na loja'),
  v('cliente-xiaomi', 'Cliente segurando a caixa do Xiaomi novo em frente ao painel JN'),
]

export const STORE_MEDIA = {
  photo: p('loja/prateleiras', 'Equipe organizando as prateleiras da JN Smartphone'),
  showcase: p('loja/ceo-produtos', 'Jailton Nanes na bancada da loja cheia de iPhones, iPads e Xiaomi'),
  clip: v('festa-loja', 'Clientes e amigos celebrando na loja JN Smartphone'),
}

export const CEO_MEDIA = {
  photo: p('ceo/jailton', 'Jailton Nanes, CEO da JN Smartphone, no balcão em frente ao letreiro da loja'),
  clip: v('ceo-jailton', 'Jailton Nanes falando na loja JN Smartphone'),
}
