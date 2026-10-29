import { BR_STATES, BR_VIEWBOX } from '../data/brazil'

/*
  Mapa do Brasil em 3D: o SVG é inclinado em perspectiva (CSS) e ganha espessura com
  camadas empilhadas. Pernambuco fica em dourado, mais alto que os outros estados.
  Três aviões saem de PE deixando um rastro pontilhado até AM, SP e RS.
*/
const ORIGIN = { x: 570, y: 214 }
const ROUTES = [
  { id: 'am', uf: 'AM', x: 150, y: 142, d: 'M570,214 Q365,32 150,142', dur: 5.2, delay: 0 },
  { id: 'sp', uf: 'SP', x: 398, y: 440, d: 'M570,214 Q585,402 398,440', dur: 4.4, delay: 1.3 },
  { id: 'rs', uf: 'RS', x: 322, y: 572, d: 'M570,214 Q500,520 322,572', dur: 5, delay: 2.5 },
]
const DEPTH = 9
const PLANE = 'M12,0 C12,-1.2 10.5,-1.7 9,-1.7 L3.2,-1.7 L-3,-9.5 L-5.8,-9.5 L-2.2,-1.7 L-7,-1.7 L-9.2,-4.8 L-11,-4.8 L-9.8,0 L-11,4.8 L-9.2,4.8 L-7,1.7 L-2.2,1.7 L-5.8,9.5 L-3,9.5 L3.2,1.7 L9,1.7 C10.5,1.7 12,1.2 12,0 Z'

export function BrazilMap() {
  const pe = BR_STATES.find((s) => s.id === 'pe')!
  const others = BR_STATES.filter((s) => s.id !== 'pe')
  return (
    <div className="map3d" role="img" aria-label="Mapa do Brasil com Pernambuco em destaque e três aviões saindo de Pernambuco para o Amazonas, São Paulo e Rio Grande do Sul">
      <div className="map3d__tilt">
        <svg viewBox={BR_VIEWBOX} className="map3d__svg" aria-hidden>
          <defs>
            <linearGradient id="br-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#34302b" />
              <stop offset="1" stopColor="#15120f" />
            </linearGradient>
            <linearGradient id="br-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffe08a" />
              <stop offset="0.5" stopColor="#f2b51c" />
              <stop offset="1" stopColor="#b97a06" />
            </linearGradient>
            <filter id="br-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <g id="br-all">{BR_STATES.map((s) => <path key={s.id} d={s.d} />)}</g>
            <g id="br-pe"><path d={pe.d} /></g>
          </defs>

          {/* sombra no chão */}
          <use href="#br-all" fill="rgba(20,14,4,.28)" transform={`translate(10 ${DEPTH + 16})`} filter="url(#br-glow)" />
          {/* espessura do país */}
          {Array.from({ length: DEPTH }, (_, k) => DEPTH - k).map((k) => (
            <use key={k} href="#br-all" fill={k > DEPTH - 2 ? '#050403' : '#0d0b09'} stroke="#0d0b09" strokeWidth={1} transform={`translate(0 ${k})`} />
          ))}
          {/* tampo dos estados */}
          <g className="map3d__states">
            {others.map((s) => <path key={s.id} d={s.d}><title>{s.name}</title></path>)}
          </g>

          {/* Pernambuco: brilho, espessura dourada e tampo elevado */}
          <use href="#br-pe" fill="#f2b51c" opacity={0.75} filter="url(#br-glow)" className="map3d__pe-glow" />
          <g className="map3d__pe">
            {Array.from({ length: 10 }, (_, k) => 10 - k).map((k) => (
              <use key={k} href="#br-pe" fill={k > 8 ? '#5a3a02' : '#8a5a04'} transform={`translate(0 ${k - 10})`} />
            ))}
            <use href="#br-pe" fill="url(#br-gold)" stroke="#ffe9a8" strokeWidth={0.8} transform="translate(0 -10)" />
          </g>

          {/* rotas pontilhadas + aviões */}
          {ROUTES.map((r) => (
            <g key={r.id} className="map3d__route">
              <mask id={`m-${r.id}`} maskUnits="userSpaceOnUse">
                <path d={r.d} stroke="#fff" strokeWidth={8} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1}>
                  <animate attributeName="stroke-dashoffset" values="1;0;0;0" keyTimes="0;0.72;0.92;1" dur={`${r.dur}s`} begin={`${r.delay}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.86;0.98;1" dur={`${r.dur}s`} begin={`${r.delay}s`} repeatCount="indefinite" />
                </path>
              </mask>
              <path className="map3d__trail map3d__trail--static" d={r.d} />
              <path className="map3d__trail" d={r.d} mask={`url(#m-${r.id})`} />
              <g className="map3d__dest" transform={`translate(${r.x} ${r.y})`}>
                <circle r={9} className="map3d__ping" style={{ animationDelay: `${r.delay + r.dur * 0.72}s`, animationDuration: `${r.dur}s` }} />
                <circle r={4.5} className="map3d__dot" />
                <text y={-12} className="map3d__uf">{r.uf}</text>
              </g>
              <g className="map3d__plane" opacity={0}>
                <path d={PLANE} transform="scale(1.15)" />
                <animateMotion dur={`${r.dur}s`} begin={`${r.delay}s`} repeatCount="indefinite" rotate="auto" keyPoints="0;1;1;1" keyTimes="0;0.72;0.92;1" calcMode="linear" path={r.d} />
                <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.06;0.66;0.74;1" dur={`${r.dur}s`} begin={`${r.delay}s`} repeatCount="indefinite" />
              </g>
            </g>
          ))}

          {/* origem: Queimadas de Jurema, PE */}
          <g transform={`translate(${ORIGIN.x} ${ORIGIN.y - 10})`} className="map3d__origin">
            <circle r={13} className="map3d__ping map3d__ping--gold" />
            <circle r={5.5} className="map3d__dot map3d__dot--gold" />
          </g>
        </svg>
        <div className="map3d__badge glass"><span className="dot" aria-hidden /> Saindo de Pernambuco</div>
      </div>
    </div>
  )
}
