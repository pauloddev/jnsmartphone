import { useEffect, useRef, useState } from 'react'
import { Cookie, X } from '@phosphor-icons/react'

const KEY = 'jn-cookies-v1'
const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
const save = (v: string) => { try { localStorage.setItem(KEY, v) } catch { /* sem armazenamento: banner volta na próxima visita */ } }

export function openCookiePolicy() { window.dispatchEvent(new Event('open-cookie-policy')) }

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const dlg = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (read()) return
    let t = 0
    const start = () => { t = window.setTimeout(() => setShow(true), 1200) }
    if (document.documentElement.dataset.intro === 'on') window.addEventListener('jn-intro-done', start, { once: true })
    else start()
    return () => { clearTimeout(t); window.removeEventListener('jn-intro-done', start) }
  }, [])
  useEffect(() => {
    const f = () => dlg.current?.showModal()
    window.addEventListener('open-cookie-policy', f)
    const d = dlg.current
    const out = (e: MouseEvent) => { if (e.target === d) d?.close() }
    d?.addEventListener('click', out)
    return () => { window.removeEventListener('open-cookie-policy', f); d?.removeEventListener('click', out) }
  }, [])

  const choose = (v: 'all' | 'essential') => { save(v); setShow(false) }

  return (
    <>
      <div className={`cookie glass glass--dark ${show ? 'is-in' : ''}`} role="region" aria-label="Aviso de cookies" aria-hidden={!show}>
        <Cookie size={26} weight="duotone" className="cookie__icon" aria-hidden />
        <p className="cookie__text">
          Usamos apenas o armazenamento necessário para o site funcionar e lembrar a sua escolha.{' '}
          <button className="link" onClick={() => dlg.current?.showModal()} tabIndex={show ? 0 : -1}>Política de cookies</button>
        </p>
        <div className="cookie__actions">
          <button className="btn btn--ghost btn--sm" onClick={() => choose('essential')} tabIndex={show ? 0 : -1}>Somente essenciais</button>
          <button className="btn btn--gold btn--sm" onClick={() => choose('all')} tabIndex={show ? 0 : -1}>Aceitar</button>
        </div>
      </div>

      <dialog ref={dlg} className="policy" aria-labelledby="policy-title">
        <article className="policy__panel">
          <header className="policy__head">
            <h2 id="policy-title">Política de cookies</h2>
            <button className="icon-btn icon-btn--light" onClick={() => dlg.current?.close()} aria-label="Fechar política de cookies"><X size={20} /></button>
          </header>
          <div className="policy__body">
            <p>Esta política explica como o site da JN Smartphone usa cookies e tecnologias parecidas.</p>
            <h3>O que são cookies</h3>
            <p>São pequenos arquivos ou registros guardados no seu navegador para que um site funcione ou lembre preferências.</p>
            <h3>O que este site usa</h3>
            <p><strong>Essenciais:</strong> um registro no armazenamento local do navegador para lembrar se você já respondeu a este aviso. Ele não identifica você e não é compartilhado.</p>
            <p>Este site <strong>não usa</strong> cookies de publicidade nem de rastreamento próprios.</p>
            <h3>Serviços de terceiros</h3>
            <p>As fontes do site são carregadas do Google Fonts. Ao tocar nos botões de WhatsApp, Instagram, Facebook ou Google Maps, você é levado a esses serviços, que seguem as próprias políticas de privacidade.</p>
            <h3>Como gerenciar</h3>
            <p>Você pode apagar ou bloquear cookies e dados de sites nas configurações do seu navegador. Ao apagar, o aviso aparece novamente.</p>
            <h3>Dúvidas</h3>
            <p>Fale com a JN Smartphone pelos canais de atendimento informados no site.</p>
          </div>
          <footer className="policy__foot">
            <button className="btn btn--dark btn--sm" onClick={() => { save('essential'); setShow(false); dlg.current?.close() }}>Entendi</button>
          </footer>
        </article>
      </dialog>
    </>
  )
}
