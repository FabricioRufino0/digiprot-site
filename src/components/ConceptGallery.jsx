import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { concepts } from '@/data/concepts'

const cardTransition = { type: 'spring', stiffness: 520, damping: 40, mass: 0.65, opacity: { duration: 0.18 } }

export default function ConceptGallery({ standalone = false }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const [dragEnabled, setDragEnabled] = useState(false)
  useEffect(() => setDragEnabled(!reducedMotion), [reducedMotion])
  const selected = concepts[selectedIndex]
  const Heading = standalone ? 'h1' : 'h2'
  const ItemHeading = standalone ? 'h2' : 'h3'
  const move = step => setSelectedIndex(index => (index + step + concepts.length) % concepts.length)

  const finishDrag = (_, info) => {
    if (info.offset.x < -72 || info.velocity.x < -450) move(1)
    else if (info.offset.x > 72 || info.velocity.x > 450) move(-1)
  }

  return (
    <section className={`concepts shell section-space${standalone ? ' concepts-standalone' : ''}`} id="modelos" aria-labelledby="concepts-title">
      <div className="section-heading">
        <Heading id="concepts-title">Exemplos para<br />inspirar seu site.</Heading>
        <p>{standalone
          ? 'Quatro estudos conceituais da DIGIPROT mostram sites para climatização, confeitaria, contabilidade e bicicletas. Veja ideias para organizar produtos e serviços. As prévias são estudos de interface, não projetos entregues a clientes. Explore como cada proposta apresenta produtos, serviços e formas de contato.'
          : 'Veja como diferentes negócios podem apresentar seus produtos e serviços em um site. Passe pelas prévias e encontre ideias para o seu.'}</p>
      </div>

      <div className="concept-carousel" role="region" aria-roledescription="carrossel" aria-label="Exemplos de sites para diferentes negócios">
        <div className="concept-stage">
          <m.div
            className="concept-deck"
            drag={dragEnabled ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 42 }}
            onDragEnd={finishDrag}
          >
            {concepts.map((concept, index) => {
              const distance = (index - selectedIndex + concepts.length) % concepts.length
              const offset = distance > concepts.length / 2 ? distance - concepts.length : distance
              const active = offset === 0
              const adjacent = Math.abs(offset) === 1

              return <m.article
                key={concept.id}
                className="concept-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${concepts.length}: ${concept.name}`}
                aria-hidden={!active}
                initial={false}
                animate={{ x: `${offset * 7.5}%`, rotateY: offset * -6, scale: active ? 1 : 0.9, opacity: active || adjacent ? 1 : 0 }}
                transition={reducedMotion ? { duration: 0 } : cardTransition}
                style={{ zIndex: active ? 3 : adjacent ? 2 : 1, pointerEvents: active ? 'auto' : 'none', '--card-shade': active ? 0 : 0.6 }}
              >
                <div className="concept-browser">
                  <div className="concept-windowbar" aria-hidden="true">
                    <span className="concept-window-dots"><i /><i /><i /></span>
                    <span>Exemplo de site</span>
                  </div>
                  <figure className="concept-screen">
                    <img src={concept.previewImage} alt={concept.alt} width={concept.width} height={concept.height} loading="eager" decoding="async" draggable={false} />
                  </figure>
                </div>
              </m.article>
            })}
          </m.div>
        </div>

        <div className="concept-carousel-info">
          <p className="concept-index" aria-hidden="true">{String(selectedIndex + 1).padStart(2, '0')} <span>/</span> {String(concepts.length).padStart(2, '0')}</p>
          <div className="concept-copy-slot">
            <m.div
              key={selected.id}
              className="concept-carousel-copy"
              initial={{ opacity: 0.65 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.16 }}
            >
              <ItemHeading>{selected.name}</ItemHeading>
              <p>{selected.summary}</p>
            </m.div>
            <p className="concept-disclaimer">Prévia de demonstração, sem vínculo com clientes.</p>
          </div>

          <div className="concept-controls-row">
            <div className="concept-pagination" role="group" aria-label="Escolher um exemplo de site">
              {concepts.map((concept, index) => (
                <button
                  key={concept.id}
                  type="button"
                  aria-label={`Ir para ${concept.name}`}
                  aria-pressed={selectedIndex === index}
                  className={selectedIndex === index ? 'is-active' : ''}
                  onClick={() => setSelectedIndex(index)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="concept-carousel-controls">
              <button type="button" className="concept-step" aria-label="Exemplo anterior" onClick={() => move(-1)}>
                <ArrowLeft aria-hidden="true" />
              </button>
              <button type="button" className="concept-step" aria-label="Próximo exemplo" onClick={() => move(1)}>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">{selected.name}, exemplo {selectedIndex + 1} de {concepts.length}</p>
        </div>
      </div>

      {standalone && (
        <section className="concept-explanations" aria-labelledby="concept-details-title">
          <h2 id="concept-details-title">O que cada estudo explora?</h2>
          <ul className="concept-details">
            {concepts.map(concept => (
              <li key={concept.id}>
                <h3>{concept.name}</h3>
                <p>{concept.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {standalone && <a className="examples-client-link" href="/#projetos">Conheça os sites feitos para nossos clientes <ArrowUpRight aria-hidden="true" /></a>}
      <noscript>
        <ul className="nojs-concepts">
          {concepts.map(concept => (
            <li key={concept.id}>
              <figure>
                <img src={concept.previewImage} alt={concept.alt} width={concept.width} height={concept.height} loading="lazy" />
                <figcaption><ItemHeading>{concept.name}</ItemHeading><p>Exemplo de demonstração. {concept.summary}</p></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </noscript>
    </section>
  )
}
