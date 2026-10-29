import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  WhatsappLogo, InstagramLogo, FacebookLogo, DeviceTablet, Watch, Laptop, DeviceMobile, DeviceMobileSpeaker, DeviceMobileCamera,
  MapPin, ArrowRight, List, X, Storefront, ChatsCircle, AppleLogo, ArrowsClockwise, CreditCard, AirplaneTilt, Clock, Crown,
} from '@phosphor-icons/react'
import {
  asset, STORE, HOURS, MSG, WHATSAPP, contactUrl, mapsUrl, HERO, IPHONE_PHOTOS, IPHONE_CLIPS, MORE_PHOTOS, CLIENT_PHOTOS, CLIENT_CLIPS, STORE_MEDIA, CEO_MEDIA,
} from '../data/site'
import { useContact, useOpenNow, Reveal, SplitTitle, LoopVideo } from './ui'
import { FocusCarousel, RailCarousel } from './Carousels'
import { BrazilMap } from './BrazilMap'
import { openCookiePolicy } from './Cookies'

const NAV = [
  { href: '#inicio', label: 'Início' },
  { href: '#iphones', label: 'iPhones' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#envio', label: 'Envio' },
  { href: '#a-jn', label: 'A JN' },
  { href: '#loja', label: 'A loja' },
]
const CTA_LABEL = WHATSAPP ? 'Falar no WhatsApp' : 'Falar com a JN'
const ContactIcon = ({ size = 18 }: { size?: number }) => WHATSAPP ? <WhatsappLogo size={size} weight="fill" aria-hidden /> : <ChatsCircle size={size} weight="fill" aria-hidden />

/* ---------------- HEADER ---------------- */
export function Header() {
  const { open } = useContact()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [menu])
  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menu ? 'is-open' : ''}`}>
      <div className="nav__bar glass glass--dark">
        <a href="#inicio" className="nav__logo" aria-label="JN Smartphone, voltar ao início">
          <img src={asset('img/logo/logo-horizontal-branco.webp')} alt="JN Smartphone" width={1321} height={405} />
        </a>
        <nav className="nav__links" aria-label="Principal">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <button className="btn btn--gold btn--sm nav__cta" onClick={() => open()}>
          <ContactIcon /> {CTA_LABEL}
        </button>
        <button className="icon-btn nav__burger" aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenu((m) => !m)}>
          {menu ? <X size={22} /> : <List size={22} />}
        </button>
      </div>
      <div id="mobile-menu" className="nav__sheet glass glass--dark" hidden={!menu}>
        <nav aria-label="Menu móvel">
          {NAV.map((n, k) => <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); setMenu(false); document.body.style.overflow = ''; requestAnimationFrame(() => { document.querySelector(n.href)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); history.replaceState(null, '', n.href) }) }} style={{ '--d': `${k * 40}ms` } as CSSProperties}>{n.label}</a>)}
        </nav>
        <button className="btn btn--gold" onClick={() => { setMenu(false); open() }}>
          <ContactIcon size={20} /> {CTA_LABEL}
        </button>
      </div>
    </header>
  )
}

/* ---------------- HERO (preto) ---------------- */
export function Hero() {
  const { open } = useContact()
  return (
    <section id="inicio" className="sec sec--dark hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden />
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <Reveal variant="fade" className="eyebrow eyebrow--gold">JN Smartphone · Queimadas de Jurema — PE</Reveal>
          <SplitTitle id="hero-title" as="h1" className="display" lines={['Conectamos', 'você ao melhor', 'da {tecnologia.}']} />
          <Reveal as="p" className="lead" delay={260}>
            Especialista em produtos Apple, com Xiaomi e realme também. Aparelhos novos e seminovos, parcelamento em até 21x e envio para todo o Brasil.
          </Reveal>
          <Reveal className="hero__ctas" delay={360}>
            <button className="btn btn--gold btn--lg" onClick={() => open(MSG.iphone)}>
              Encontrar meu próximo iPhone <ArrowRight size={18} weight="bold" aria-hidden />
            </button>
            <a className="btn btn--glass btn--lg" href="#loja"><Storefront size={18} aria-hidden /> Conhecer a loja</a>
          </Reveal>
          <Reveal as="ul" className="hero__facts" delay={460}>
            <li><strong>21x</strong><span>parcelamento<br />disponível</span></li>
            <li><strong>Apple</strong><span>novos e<br />seminovos</span></li>
            <li><strong>Brasil</strong><span>envio para<br />todos os estados</span></li>
          </Reveal>
        </div>

        <div className="hero__art">
          <Reveal variant="photo" className="hero__main frame">
            <img src={HERO.main.src} alt={HERO.main.alt} fetchPriority="high" width={640} height={800} />
          </Reveal>
          <Reveal variant="photo" delay={180} className="hero__second frame">
            <img src={HERO.second.src} alt={HERO.second.alt} width={640} height={800} />
          </Reveal>
          <Reveal delay={420} className="hero__chip glass glass--dark">
            <span className="dot" aria-hidden /> Consulte modelos, cores e valores
          </Reveal>
          <div className="hero__ring" aria-hidden />
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAIXA DE MARCAS (branco) ---------------- */
const WORDS = ['Apple', 'iPhone', 'iPad', 'Apple Watch', 'MacBook', 'AirPods', 'Xiaomi', 'Redmi', 'POCO', 'realme']
export function BrandStrip() {
  const row = [...WORDS, ...WORDS]
  return (
    <section className="sec sec--light strip" aria-label="Marcas e produtos que você encontra na JN Smartphone">
      <p className="strip__title wrap">Aqui realizamos sonhos.</p>
      <div className="marquee">
        <div className="marquee__track">
          {[0, 1].map((g) => (
            <ul className="marquee__group" key={g} aria-hidden={g === 1}>
              {row.map((w, k) => (
                <li key={k} className="word">
                  {w === 'Apple' && <AppleLogo size={30} weight="fill" aria-hidden />}
                  <span>{w}</span>
                  <Crown size={18} weight="fill" className="word__sep" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- DESTAQUE EM VÍDEO (preto) ---------------- */
export function Destaque() {
  const { open } = useContact()
  return (
    <section id="iphones" className="sec sec--dark dest" aria-labelledby="dest-title">
      <div className="wrap center-head">
        <Reveal className="eyebrow eyebrow--gold">Em destaque</Reveal>
        <SplitTitle id="dest-title" className="h2" lines={['Do iPhone 11', 'ao {Pro Max.}']} />
        <Reveal as="p" className="body" delay={120}>Novos e seminovos em várias cores e capacidades. Passe pelas setas ou deslize para ver de perto.</Reveal>
      </div>
      <Reveal variant="fade" className="wrap--wide"><FocusCarousel clips={IPHONE_CLIPS} label="Vídeos de iPhones em destaque" /></Reveal>
      <Reveal className="center-cta" delay={120}>
        <button className="btn btn--gold" onClick={() => open(MSG.iphone)}><ContactIcon /> Consultar modelos e valores</button>
      </Reveal>
    </section>
  )
}

/* ---------------- FOTOS DE IPHONES (branco) ---------------- */
export function IphoneFotos() {
  const { open } = useContact()
  return (
    <section className="sec sec--light vit" aria-labelledby="vit-title">
      <div className="wrap split-head">
        <div>
          <Reveal className="eyebrow">Novos e seminovos</Reveal>
          <SplitTitle id="vit-title" className="h2" lines={['O iPhone certo,', '{do jeito que você quer.}']} />
        </div>
        <div className="split-head__side">
          <Reveal as="p" className="body" delay={120}>Cada aparelho é mostrado de perto antes de chegar até você: cor, capacidade e estado, tudo conversado com a equipe.</Reveal>
          <Reveal className="split-head__btns" delay={200}>
            <button className="btn btn--dark btn--sm" onClick={() => open(MSG.iphone)}>Ver novos</button>
            <button className="btn btn--glass-light btn--sm" onClick={() => open(MSG.seminovo)}><ArrowsClockwise size={16} aria-hidden /> Ver seminovos</button>
          </Reveal>
        </div>
      </div>
      <Reveal variant="fade" className="wrap"><RailCarousel photos={IPHONE_PHOTOS} label="Fotos de iPhones na loja" /></Reveal>
    </section>
  )
}

/* ---------------- CATEGORIAS (preto) ---------------- */
const CATS = [
  { t: 'iPhone', d: 'Do 11 ao Pro Max, novos e seminovos.', q: 'iPhone', I: DeviceMobile },
  { t: 'iPad', d: 'Para estudar, trabalhar e criar.', q: 'iPad', I: DeviceTablet },
  { t: 'Apple Watch', d: 'SE, Series e Ultra.', q: 'Apple Watch', I: Watch },
  { t: 'MacBook', d: 'Notebooks Apple para o dia a dia.', q: 'MacBook', I: Laptop },
  { t: 'Xiaomi, Redmi e POCO', d: 'Smartphones e tablets Xiaomi.', q: 'produtos Xiaomi', I: DeviceMobileSpeaker },
  { t: 'realme', d: 'Smartphones realme.', q: 'produtos realme', I: DeviceMobileCamera },
]
export function Categorias() {
  const { open } = useContact()
  return (
    <section id="produtos" className="sec sec--dark ele" aria-labelledby="ele-title">
      <div className="wrap center-head">
        <Reveal className="eyebrow eyebrow--gold">Especialista em Apple</Reveal>
        <SplitTitle id="ele-title" className="h2" lines={['Apple, Xiaomi e realme', 'em um só {lugar.}']} />
        <Reveal as="p" className="body" delay={140}>Escolha a categoria e consulte com a equipe o que está disponível agora.</Reveal>
      </div>
      <ul className="wrap cats">
        {CATS.map(({ t, d, q, I }, k) => (
          <Reveal as="li" key={t} delay={(k % 3) * 70} className="cat glass glass--dark">
            <span className="cat__icon" aria-hidden><I size={28} weight="duotone" /></span>
            <h3 className="cat__title">{t}</h3>
            <p className="cat__desc">{d}</p>
            <button className="cat__cta" onClick={() => open(MSG.categoria(q))}>
              Consultar <ArrowRight size={16} weight="bold" aria-hidden />
            </button>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- ALÉM DO IPHONE: fotos (branco) ---------------- */
export function Prateleira() {
  return (
    <section className="sec sec--light shelf" aria-labelledby="shelf-title">
      <div className="wrap center-head">
        <Reveal className="eyebrow">Na prateleira</Reveal>
        <SplitTitle id="shelf-title" className="h2" lines={['Muito além', 'do {iPhone.}']} />
        <Reveal as="p" className="body" delay={120}>MacBook, Apple Watch, iPad e tablets Xiaomi que passaram pela nossa bancada.</Reveal>
      </div>
      <ul className="wrap shelf__grid">
        {MORE_PHOTOS.map((f, k) => (
          <Reveal as="li" key={f.src} variant="photo" delay={k * 80} className="frame"><img src={f.src} alt={f.alt} loading="lazy" width={960} height={1200} /></Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- CLIENTES (preto): fotos e, abaixo, vídeos ---------------- */
export function Clientes() {
  return (
    <section className="sec sec--dark cli" aria-labelledby="cli-title">
      <div className="wrap cli__grid">
        <div className="cli__photos">
          <Reveal variant="photo" className="frame cli__big"><img src={CLIENT_PHOTOS.big.src} alt={CLIENT_PHOTOS.big.alt} loading="lazy" /></Reveal>
          <div className="cli__smalls">
            {CLIENT_PHOTOS.small.map((p, k) => (
              <Reveal key={p.src} variant="photo" delay={120 + k * 90} className="frame"><img src={p.src} alt={p.alt} loading="lazy" /></Reveal>
            ))}
          </div>
        </div>
        <div className="cli__copy">
          <Reveal className="eyebrow eyebrow--gold">Clientes</Reveal>
          <SplitTitle id="cli-title" className="h2" lines={['Gente que saiu', 'daqui com o', '{sonho na mão.}']} />
          <Reveal as="p" className="body" delay={140}>
            O aparelho novo, a sacola com a coroa e o obrigado no Instagram. Cada entrega da JN é registrada e comemorada com quem comprou.
          </Reveal>
          <Reveal as="p" className="cli__note" delay={220}>Registros publicados no Instagram {STORE.instagramHandle}.</Reveal>
        </div>
      </div>
      <div className="wrap cli__videos">
        {CLIENT_CLIPS.map((c, k) => (
          <Reveal key={c.src} variant="photo" delay={k * 90} className="frame"><LoopVideo src={c.src} poster={c.poster} label={c.alt} /></Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- ENVIO: mapa 3D (branco) ---------------- */
export function Envio() {
  const { open } = useContact()
  return (
    <section id="envio" className="sec sec--light envio" aria-labelledby="envio-title">
      <div className="envio__glow" aria-hidden />
      <div className="wrap envio__grid">
        <div className="envio__copy">
          <Reveal className="eyebrow eyebrow--gold">Envio para todo o Brasil</Reveal>
          <SplitTitle id="envio-title" className="h2 envio__title" lines={['Entregamos em', '{todo Brasil.}']} />
          <Reveal as="p" className="body" delay={140}>
            Saiu de Queimadas de Jurema, em Pernambuco, chega até você. Atendimento presencial na loja, entregas e suporte em Cachoeirinha e região, e envio para qualquer estado.
          </Reveal>
          <Reveal as="ul" className="envio__steps" delay={220}>
            <li><span>1</span>Escolha o aparelho com a equipe</li>
            <li><span>2</span>Combine pagamento e envio</li>
            <li><span>3</span>Receba em casa, em qualquer estado</li>
          </Reveal>
          <Reveal delay={300}>
            <button className="btn btn--dark" onClick={() => open(MSG.envio)}><AirplaneTilt size={18} weight="fill" aria-hidden /> Consultar envio para minha cidade</button>
          </Reveal>
        </div>
        <Reveal variant="fade" className="envio__map"><BrazilMap /></Reveal>
      </div>
    </section>
  )
}

/* ---------------- CEO (preto) ---------------- */
export function Ceo() {
  return (
    <section id="a-jn" className="sec sec--dark ceo" aria-labelledby="ceo-title">
      <div className="ceo__glow" aria-hidden />
      <div className="wrap ceo__grid">
        <div className="ceo__art">
          <Reveal variant="photo" className="frame ceo__main"><img src={CEO_MEDIA.photo.src} alt={CEO_MEDIA.photo.alt} loading="lazy" /></Reveal>
          <Reveal variant="photo" delay={180} className="frame ceo__second"><img src={STORE_MEDIA.showcase.src} alt={STORE_MEDIA.showcase.alt} loading="lazy" /></Reveal>
        </div>
        <div className="ceo__copy">
          <Reveal className="eyebrow eyebrow--gold">Conheça o CEO</Reveal>
          <SplitTitle id="ceo-title" className="h2" lines={['Por trás', 'da {coroa.}']} />
          <Reveal as="p" className="ceo__quote" delay={140}>
            Jailton Nanes está à frente da JN Smartphone, a loja de Queimadas de Jurema que leva iPhone, Xiaomi e realme para clientes de todo o Brasil.
          </Reveal>
          <Reveal className="ceo__sign" delay={240}>
            <img src={asset('img/logo/icone-branco.png')} alt="" aria-hidden width={362} height={405} />
            <div><strong>{STORE.ceo}</strong><span>CEO · JN Smartphone</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- POR DENTRO DA LOJA: vídeos (branco) ---------------- */
export function PorDentro() {
  return (
    <section className="sec sec--light inside" aria-labelledby="inside-title">
      <div className="wrap center-head">
        <Reveal className="eyebrow">Por dentro da JN</Reveal>
        <SplitTitle id="inside-title" className="h2" lines={['Uma loja feita', 'para {receber você.}']} />
        <Reveal as="p" className="body" delay={120}>Clientes, amigos e muita celebração. Vem conhecer de perto.</Reveal>
      </div>
      <div className="wrap inside__grid">
        <Reveal variant="photo" className="frame"><LoopVideo src={STORE_MEDIA.clip.src} poster={STORE_MEDIA.clip.poster} label={STORE_MEDIA.clip.alt} /></Reveal>
        <Reveal variant="photo" delay={120} className="frame"><LoopVideo src={CEO_MEDIA.clip.src} poster={CEO_MEDIA.clip.poster} label={CEO_MEDIA.clip.alt} /></Reveal>
      </div>
    </section>
  )
}

/* ---------------- POR QUE + 21X (preto) ---------------- */
export function PorQue() {
  const { open } = useContact()
  const items = [
    { i: <Storefront size={24} weight="duotone" />, t: 'Loja física', d: 'Em Queimadas de Jurema, para ver e testar antes de decidir.' },
    { i: <AppleLogo size={24} weight="duotone" />, t: 'Especialista em Apple', d: 'iPhone, iPad, Apple Watch e MacBook.' },
    { i: <ArrowsClockwise size={24} weight="duotone" />, t: 'Novos e seminovos', d: 'Opções para cada momento e cada bolso.' },
    { i: <AirplaneTilt size={24} weight="duotone" />, t: 'Envio para todo o Brasil', d: 'Comprou daqui, recebe aí.' },
    { i: <ChatsCircle size={24} weight="duotone" />, t: 'Atendimento direto', d: 'Fale com a equipe e tire todas as dúvidas.' },
  ]
  return (
    <section className="sec sec--dark why" aria-labelledby="why-title">
      <div className="wrap why__grid">
        <div className="why__copy">
          <Reveal className="eyebrow eyebrow--gold">Por que a JN</Reveal>
          <SplitTitle id="why-title" className="h2" lines={['Tecnologia de rei,', 'atendimento', 'de {verdade.}']} />
          <Reveal as="p" className="body" delay={140}>Escolher um aparelho é mais fácil quando dá para conversar, comparar e tirar dúvidas com quem entende.</Reveal>
        </div>
        <ol className="why__list">
          {items.map((x, k) => (
            <Reveal as="li" key={x.t} delay={k * 70} className="why__item glass glass--dark">
              <span className="why__icon" aria-hidden>{x.i}</span>
              <div><h3>{x.t}</h3><p>{x.d}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
      <div className="wrap">
        <Reveal className="pay glass glass--dark" variant="fade">
          <div className="pay__num" aria-hidden>21<small>x</small></div>
          <div className="pay__copy">
            <h3><CreditCard size={22} weight="duotone" aria-hidden /> Parcele em até 21x.</h3>
            <p>Simule com a equipe o parcelamento do seu próximo aparelho.</p>
          </div>
          <button className="btn btn--gold" onClick={() => open(MSG.parcelamento)}><ContactIcon /> Simular parcelamento</button>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- LOJA + HORÁRIO (branco) ---------------- */
export function Loja() {
  const { open } = useContact()
  const { today, open: isOpen } = useOpenNow()
  const idx = Math.max(0, HOURS.findIndex((h) => h.day === today))
  const sorted = [...HOURS.slice(idx), ...HOURS.slice(0, idx)]
  return (
    <section id="loja" className="sec sec--light lojas" aria-labelledby="lojas-title">
      <div className="lojas__glow" aria-hidden />
      <div className="wrap center-head">
        <Reveal className="eyebrow">A loja</Reveal>
        <SplitTitle id="lojas-title" className="h2" lines={['Queimadas de Jurema.', 'A JN {te espera.}']} />
      </div>
      <div className="wrap loja__grid">
        <Reveal className="store glass">
          <div className="store__top">
            <span className="store__label">Loja física</span>
            <h3 className="store__city">Jurema<span>/PE</span></h3>
          </div>
          <p className="store__addr"><MapPin size={18} weight="fill" aria-hidden /> {STORE.address}</p>
          <div className="hours">
            <div className="hours__head">
              <Clock size={18} weight="duotone" aria-hidden />
              <strong className={isOpen ? 'is-open' : 'is-closed'}>{isOpen ? 'Aberta agora' : 'Fechada agora'}</strong>
            </div>
            <ul className="hours__list">
              {sorted.map((h) => (
                <li key={h.day} className={h.day === today ? 'is-today' : ''}><span>{h.label}</span><span>{h.open} – {h.close}</span></li>
              ))}
            </ul>
          </div>
          <button className="btn btn--gold btn--block" onClick={() => open()}><ContactIcon /> {CTA_LABEL}</button>
          <div className="store__links">
            <a className="btn btn--glass-light btn--sm" href={mapsUrl(STORE.address)} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden /> Localização</a>
            <a className="btn btn--glass-light btn--sm" href={STORE.instagram} target="_blank" rel="noopener noreferrer"><InstagramLogo size={16} aria-hidden /> Instagram</a>
          </div>
        </Reveal>
        <Reveal variant="photo" delay={120} className="frame loja__photo"><img src={STORE_MEDIA.photo.src} alt={STORE_MEDIA.photo.alt} loading="lazy" /></Reveal>
      </div>
    </section>
  )
}

/* ---------------- CTA FINAL (preto) ---------------- */
export function CtaFinal() {
  const { open } = useContact()
  return (
    <section className="sec sec--dark cta" aria-labelledby="cta-title">
      <div className="cta__glow" aria-hidden />
      <div className="wrap cta__inner">
        <img className="cta__icon" src={asset('img/logo/icone-branco.png')} alt="" aria-hidden width={362} height={405} loading="lazy" />
        <SplitTitle id="cta-title" className="h2 cta__title" lines={['Seu próximo smartphone', 'está a uma conversa', 'de {distância.}']} />
        <Reveal as="p" className="lead" delay={140}>Conte o que você procura e consulte modelos, valores e condições de parcelamento.</Reveal>
        <Reveal delay={240}>
          <button className="btn btn--gold btn--lg" onClick={() => open()}><ContactIcon size={20} /> {CTA_LABEL}</button>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- FOOTER (branco) ---------------- */
export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__top">
        <div className="foot__brand">
          <img src={asset('img/logo/logo-horizontal-preto.webp')} alt="JN Smartphone" width={1321} height={405} loading="lazy" />
          <p>Especialista em produtos Apple, com Xiaomi e realme. Aparelhos novos e seminovos, parcelamento em até 21x e envio para todo o Brasil.</p>
        </div>
        <nav className="foot__nav" aria-label="Rodapé">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
      </div>
      <div className="wrap foot__stores">
        <div className="foot__col">
          <h3>Endereço</h3>
          <p className="foot__addr"><MapPin size={15} weight="fill" aria-hidden /> {STORE.address}</p>
        </div>
        <div className="foot__col">
          <h3>Horário</h3>
          <p className="foot__addr"><Clock size={15} weight="fill" aria-hidden /> Segunda a sexta, 9h às 18h<br />Sábado e domingo, 9h às 12h</p>
        </div>
        <div className="foot__col">
          <h3>Canais</h3>
          <div className="foot__links">
            <a href={STORE.instagram} target="_blank" rel="noopener noreferrer"><InstagramLogo size={15} aria-hidden /> {STORE.instagramHandle}</a>
            <a href={STORE.facebook} target="_blank" rel="noopener noreferrer"><FacebookLogo size={15} aria-hidden /> JN Smartphones</a>
            {WHATSAPP && <a href={contactUrl()} target="_blank" rel="noopener noreferrer"><WhatsappLogo size={15} aria-hidden /> WhatsApp</a>}
          </div>
        </div>
      </div>
      <div className="wrap foot__bottom">
        <p>© {new Date().getFullYear()} JN Smartphone. Todos os direitos reservados. · <button className="link" onClick={openCookiePolicy}>Política de cookies</button></p>
        <p>Mapa: <a href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noopener noreferrer">SVG Maps</a>, CC BY 4.0</p>
      </div>
    </footer>
  )
}

/* ---------------- BOTÃO FLUTUANTE ---------------- */
export function FloatWhats() {
  const { open } = useContact()
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700
      let ok = window.scrollY > 700 && !nearEnd
      const el = ref.current
      if (ok && el) {
        const r = el.getBoundingClientRect()
        const pts: [number, number][] = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 4, r.top + 4], [r.right - 4, r.top + 4], [r.left + 4, r.bottom - 4], [r.right - 4, r.bottom - 4]]
        for (const [x, y] of pts) {
          const under = document.elementsFromPoint(x, y).find((n) => !el.contains(n))
          if (under?.closest('a, button, .why__item, .cat, .store, .pay, .frame, .rail__item, .focus__slide, figure, .map3d')) { ok = false; break }
        }
      }
      setShow(ok)
    }
    const f = () => { if (!raf) raf = requestAnimationFrame(check) }
    check(); window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', f)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); cancelAnimationFrame(raf) }
  }, [])
  return (
    <button ref={ref} className={`float glass glass--dark ${show ? 'is-in' : ''}`} onClick={() => open()} aria-label={`${CTA_LABEL} pelo ${WHATSAPP ? 'WhatsApp' : 'Instagram'}`} tabIndex={show ? 0 : -1}>
      <ContactIcon size={26} />
    </button>
  )
}
