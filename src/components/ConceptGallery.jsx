import { useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowDown, ArrowUpRight, Monitor, Smartphone, X, Expand } from 'lucide-react'
import { concepts, conceptCategories, conceptsDescription } from '@/data/concepts'
import { commercialUrl } from '@/data/projects'
import ConceptPreview from './ConceptPreview'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Button } from './ui/button'

const spring = { type: 'spring', stiffness: 320, damping: 32 }

function ConceptCard({ concept, ref }) {
  const [open, setOpen] = useState(false)
  const [device, setDevice] = useState('desktop')
  const reduce = useReducedMotion()
  const contact = commercialUrl.split('?')[0] + '?text=' + encodeURIComponent('Olá! Gostei do exemplo de ' + concept.name.toLowerCase() + ' (' + concept.brand + ') no site da DIGIPROT e gostaria de conversar sobre meu projeto.')

  return <m.article ref={ref} layout="position" className="gallery-card" initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }} transition={reduce ? { duration: 0 } : spring}>
    <Dialog open={open} onOpenChange={next => { setOpen(next); if (next) setDevice('desktop') }}>
      <DialogTrigger className="gallery-preview-trigger" aria-label={'Explorar exemplo de ' + concept.name.toLowerCase()} style={{ '--stage-color': concept.color }}>
        <div className="gallery-preview-window" aria-hidden="true"><div className="gallery-windowbar"><span /><span /><span /><i>{concept.brand.toLowerCase()} / estudo de site</i></div><ConceptPreview concept={concept} /></div>
        <span className="gallery-preview-open"><Expand aria-hidden="true" />Explorar modelo</span>
      </DialogTrigger>
      <div className="gallery-card-caption"><div><p>{concept.style}</p><h3>{concept.name}</h3></div><span className="gallery-palette" aria-hidden="true"><i style={{ background: concept.color }} /><i style={{ background: concept.ink }} /><i /></span></div>
      <p className="gallery-card-summary">{concept.summary}</p>
      <DialogContent className="concept-viewer">
        <div className="viewer-toolbar">
          <div><DialogTitle>{concept.brand} <span>/ {concept.name}</span></DialogTitle><DialogDescription>Estudo conceitual. Navegue pela prévia abaixo.</DialogDescription></div>
          <ToggleGroup className="viewer-formats" value={[device]} onValueChange={value => { if (value.length) setDevice(value[0]) }} aria-label="Formato da prévia">
            <ToggleGroupItem value="desktop" aria-label="Computador"><Monitor aria-hidden="true" /><span>Computador</span></ToggleGroupItem>
            <ToggleGroupItem value="mobile" aria-label="Celular"><Smartphone aria-hidden="true" /><span>Celular</span></ToggleGroupItem>
          </ToggleGroup>
          <DialogClose render={<Button variant="outline" size="icon" />} aria-label="Fechar prévia"><X aria-hidden="true" /></DialogClose>
        </div>
        <div className="viewer-scroll">
          <m.div layout={!reduce} className="viewer-device" data-device={device} transition={spring} style={{ borderRadius: device === 'mobile' ? 24 : 10 }}>
            <div className="viewer-browserbar"><span aria-hidden="true">● ● ●</span><span>{concept.brand.toLowerCase()} — prévia de demonstração</span></div>
            <ConceptPreview concept={concept} device={device} expanded />
          </m.div>
        </div>
        <div className="viewer-footer"><p>Gostou desta direção para o seu negócio?</p><a className="action action-primary" href={contact} target="_blank" rel="noopener noreferrer">Quero um site assim <ArrowUpRight aria-hidden="true" /></a></div>
      </DialogContent>
    </Dialog>
  </m.article>
}

export default function ConceptGallery() {
  const [category, setCategory] = useState('Todos')
  const reduce = useReducedMotion()
  const visible = category === 'Todos' ? concepts : concepts.filter(concept => concept.category === category)

  return <div className="examples-page">
    <section className="gallery-opening shell" aria-labelledby="concepts-title">
      <div className="gallery-opening-copy"><p className="gallery-overline">O estúdio de ideias da DIGIPROT</p><h1 id="concepts-title">Seu negócio.<br />Outras possibilidades.</h1><p className="gallery-lead">Oito direções de design para imaginar o que o seu site pode ser. Escolha uma, entre e explore.</p><a href="#colecao" className="gallery-explore">Encontre sua inspiração <span><ArrowDown aria-hidden="true" /></span></a></div>
      <div className="gallery-opening-art" aria-hidden="true">
        {[concepts[1], concepts[0], concepts[2]].map((concept, index) => <div key={concept.id} className={'opening-preview opening-preview-' + index}><ConceptPreview concept={concept} eager /></div>)}
        <span className="opening-note">Cada negócio pede um olhar.</span>
      </div>
      <div className="gallery-opening-foot"><span>Design para explorar, do seu jeito.</span><p>Modelos conceituais · Marcas fictícias</p></div>
    </section>

    <section className="gallery-collection shell" id="colecao" aria-labelledby="collection-title">
      <div className="gallery-collection-heading"><h2 id="collection-title">Qual é a sua próxima ideia?</h2><p>Abra um modelo para ver os detalhes.<br />Experimente também a versão para celular.</p></div>
      <div className="gallery-filterbar"><ToggleGroup className="gallery-filters" value={[category]} onValueChange={value => { if (value.length) setCategory(value[0]) }} aria-label="Filtrar exemplos por segmento">{conceptCategories.map(item => <ToggleGroupItem key={item} value={item}>{item}</ToggleGroupItem>)}</ToggleGroup><span className="gallery-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'modelo' : 'modelos'}</span></div>
      <m.div layout={!reduce} className="gallery-grid" transition={spring}><AnimatePresence initial={false} mode="popLayout">{visible.map(concept => <ConceptCard key={concept.id} concept={concept} />)}</AnimatePresence></m.div>
      <noscript><p>As prévias e descrições estão disponíveis abaixo. Ative o JavaScript para abrir os modelos e usar os filtros.</p></noscript>
    </section>

    <section className="gallery-about shell" aria-labelledby="gallery-about-title"><div><h2 id="gallery-about-title">Uma referência.<br />O seu ponto de partida.</h2><p>{conceptsDescription}</p><p>Estes são estudos de interface, não projetos entregues a clientes. As marcas são fictícias. Seu site é criado a partir da identidade e das necessidades do seu negócio.</p></div><a className="gallery-contact-link" href={commercialUrl} target="_blank" rel="noopener noreferrer">Vamos criar o seu?<ArrowUpRight aria-hidden="true" /></a></section>

    <section className="gallery-notes shell" aria-label="Sobre os estudos"><ul className="concept-details">{concepts.map(concept => <li key={concept.id}><details><summary>{concept.name}<span aria-hidden="true">+</span></summary><p>{concept.detail}</p></details></li>)}</ul><a className="examples-client-link" href="/#projetos">Ver os projetos de clientes <ArrowUpRight aria-hidden="true" /></a></section>
  </div>
}
