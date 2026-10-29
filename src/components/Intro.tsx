import { useEffect, useState } from 'react'
import { asset } from '../data/site'

/*
  Intro da JN Smartphone:
  1. entra o "JN" (escrito da esquerda para a direita, com feixe de luz dourado)
  2. sobe o "SMARTPHONE" e, logo depois, "Conectamos você ao melhor da tecnologia"
  3. a coroa cai em cima do JN (impacto com brilho)
  4. o logo inteiro se transforma na maçã da Apple
  5. a maçã sai e a landing page é revelada
  Toca uma vez por sessão, pode ser pulada e não aparece com movimento reduzido.
*/
const KEY = 'jn-intro-v1'
const TOTAL = 4800

function shouldPlay() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try { return !sessionStorage.getItem(KEY) } catch { return true }
}

export const INTRO_PLAYS = shouldPlay()
if (INTRO_PLAYS) document.documentElement.dataset.intro = 'on'

export function Intro() {
  const [phase, setPhase] = useState<'play' | 'leave' | 'done'>(INTRO_PLAYS ? 'play' : 'done')

  useEffect(() => {
    if (phase === 'done') return
    document.body.style.overflow = 'hidden'
    const finish = () => setPhase('leave')
    const t = window.setTimeout(finish, TOTAL - 650)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish() }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [phase])

  useEffect(() => {
    if (phase !== 'leave') return
    try { sessionStorage.setItem(KEY, '1') } catch { /* sem armazenamento: toca de novo na próxima visita */ }
    delete document.documentElement.dataset.intro
    window.dispatchEvent(new Event('jn-intro-done'))
    const t = window.setTimeout(() => { document.body.style.overflow = ''; setPhase('done') }, 700)
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'done') return null
  return (
    <div className={`intro ${phase === 'leave' ? 'is-leaving' : ''}`} role="presentation" onClick={() => setPhase('leave')}>
      <div className="intro__tex" aria-hidden />
      <div className="intro__scan" aria-hidden />
      <div className="intro__stage" aria-hidden>
        <div className="intro__logo">
          <div className="intro__jn">
            <img src={asset('img/logo/intro-jn.png')} alt="" width={625} height={511} />
            <span className="intro__pen" />
          </div>
          <img className="intro__word" src={asset('img/logo/intro-smartphone.png')} alt="" width={625} height={511} />
          <img className="intro__slogan" src={asset('img/logo/intro-slogan.png')} alt="" width={625} height={511} />
          <img className="intro__crown" src={asset('img/logo/intro-coroa.png')} alt="" width={625} height={511} />
          <span className="intro__flash" />
        </div>
        <img className="intro__apple" src={asset('img/logo/apple-branca.png')} alt="" width={204} height={250} />
      </div>
      <p className="sr-only">JN Smartphone</p>
      <button className="intro__skip" onClick={(e) => { e.stopPropagation(); setPhase('leave') }}>Pular intro</button>
    </div>
  )
}
