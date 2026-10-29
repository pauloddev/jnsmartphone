import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from 'react'
import { MSG, HOURS, contactUrl } from '../data/site'

/* ---------- Contato (WhatsApp ou Direct) ---------- */
export function useContact() {
  return { open: (message: string = MSG.geral) => { window.open(contactUrl(message), '_blank', 'noopener,noreferrer') } }
}

/* ---------- Loja aberta agora? (horário de Pernambuco) ---------- */
function nowInPE() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Recife', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date())
  const get = (t: string) => parts.find((x) => x.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, min: Number(get('hour')) * 60 + Number(get('minute')) }
}
const toMin = (h: string) => { const [a, b] = h.split(':').map(Number); return a * 60 + b }
export function useOpenNow() {
  const calc = () => {
    const { day, min } = nowInPE()
    const h = HOURS.find((x) => x.day === day)
    return { today: day, open: !!h && min >= toMin(h.open) && min < toMin(h.close) }
  }
  const [s, set] = useState(calc)
  useEffect(() => { const t = window.setInterval(() => set(calc()), 60000); return () => clearInterval(t) }, [])
  return s
}

/* ---------- Revelação ao rolar ---------- */
let io: IntersectionObserver | null = null
const seen = new WeakMap<Element, () => void>()
function getIO() {
  if (io || typeof window === 'undefined') return io
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { seen.get(e.target)?.(); io!.unobserve(e.target) } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return io
}
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, set] = useState(false)
  useEffect(() => {
    const el = ref.current; const o = getIO()
    if (!el || !o) { set(true); return }
    seen.set(el, () => set(true)); o.observe(el)
    return () => o.unobserve(el)
  }, [])
  return [ref, inView] as const
}

type RevealProps = { as?: ElementType; className?: string; delay?: number; variant?: 'up' | 'photo' | 'line' | 'fade'; children: ReactNode; style?: CSSProperties; [k: string]: unknown }
export function Reveal({ as: Tag = 'div', className = '', delay = 0, variant = 'up', children, style, ...rest }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag ref={ref} className={`rv rv--${variant} ${inView ? 'is-in' : ''} ${className}`} style={{ ...style, '--d': `${delay}ms` } as CSSProperties} {...rest}>
      {children}
    </Tag>
  )
}

/* Título com linhas que sobem por trás de uma máscara */
export function SplitTitle({ as: Tag = 'h2', lines, className = '', accent, id }: { as?: ElementType; lines: string[]; className?: string; accent?: number; id?: string }) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag ref={ref} id={id} aria-label={lines.join(' ').replace(/[{}]/g, '')} className={`split ${inView ? 'is-in' : ''} ${className}`}>
      {lines.map((l, i) => (
        <span className="split__mask" key={i} aria-hidden>
          <span className={`split__line ${accent === i ? 'accent' : ''}`} style={{ '--d': `${i * 90}ms` } as CSSProperties}>{l.split(/(\{[^}]+\})/).map((part, j) => part.startsWith('{') ? <span key={j} className="accent">{part.slice(1, -1)}</span> : part)}{i < lines.length - 1 ? ' ' : ''}</span>
        </span>
      ))}
    </Tag>
  )
}

/* ---------- Vídeo em loop que só toca visível ---------- */
export function LoopVideo({ src, poster, label, className = '' }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause() }, { threshold: 0.25 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />
}

