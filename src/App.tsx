import { CookieConsent } from './components/Cookies'
import { Intro } from './components/Intro'
import {
  Header, Hero, BrandStrip, Destaque, IphoneFotos, Categorias, Prateleira, Clientes, Envio, Ceo, PorDentro, PorQue, Loja, CtaFinal, Footer, FloatWhats,
} from './components/Sections'

export default function App() {
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <BrandStrip />
        <Destaque />
        <IphoneFotos />
        <Categorias />
        <Prateleira />
        <Clientes />
        <Envio />
        <Ceo />
        <PorDentro />
        <PorQue />
        <Loja />
        <CtaFinal />
      </main>
      <Footer />
      <FloatWhats />
      <CookieConsent />
      <Intro />
    </>
  )
}
