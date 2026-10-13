import { ArrowUpRight, Snowflake, Check, Scissors, Flower2 } from 'lucide-react'

export default function ConceptPreview({ concept, device = 'desktop', expanded = false, eager = false }) {
  const destination = `demo-${concept.id}-servicos`
  const about = `demo-${concept.id}-sobre`
  const Action = expanded ? 'a' : 'span'
  const Heading = expanded ? 'h3' : 'div'
  const scrollToSection = event => {
    event.preventDefault()
    const section = document.getElementById(event.currentTarget.hash.slice(1))
    section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  }
  const linkProps = id => expanded ? { href: `#${id}`, onClick: scrollToSection } : {}

  return <div className={`demo-site demo-${concept.id}`} data-device={device} data-expanded={expanded || undefined} style={{ '--demo-paper': concept.color, '--demo-ink': concept.ink }}>
    <div className="demo-nav">
      <span className="demo-brand">{concept.brand}</span>
      <div className="demo-nav-links"><Action {...linkProps(destination)}>{concept.navLabel}</Action><Action {...linkProps(about)}>Sobre {concept.brand}</Action></div>
      <Action className="demo-nav-action" {...linkProps(destination)}>{concept.navLabel}<ArrowUpRight aria-hidden="true" /></Action>
    </div>
    <div className="demo-hero">
      <div className="demo-copy">
        <Heading className="demo-headline">{concept.headline.split('\n').map(line => <span key={line}>{line}</span>)}</Heading>
        <p className="demo-intro">{concept.intro}</p>
        <Action className="demo-action" {...linkProps(destination)}>{concept.action}<ArrowUpRight aria-hidden="true" /></Action>
      </div>
      {concept.id === 'contabilidade' ? <div className="demo-soma-art">
        <div className="soma-note"><strong>Menos papel solto.<br />Mais visão do negócio.</strong><ul>{['Abertura da empresa', 'Rotina fiscal', 'Folha de pagamento'].map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul><span className="soma-note-foot">Tudo começa com uma conversa.</span></div>
      </div> : <figure className="demo-photo">
        <img src={`/assets/concepts/photos/${concept.id}.webp`} alt={expanded ? concept.photoAlt : ''} width="300" height="300" loading={eager || expanded ? 'eager' : 'lazy'} decoding="async" />
        {concept.photoCaption && <figcaption>{concept.photoCaption}</figcaption>}
      </figure>}
      {concept.id === 'climatizacao' && <span className="demo-seal" aria-hidden="true"><Snowflake /></span>}
      {concept.id === 'barbearia' && <span className="demo-seal" aria-hidden="true"><Scissors /></span>}
      {concept.id === 'estetica' && <span className="demo-seal" aria-hidden="true"><Flower2 /></span>}
      {concept.id === 'confeitaria' && <span className="demo-stamp" aria-hidden="true">feito com<br />carinho</span>}
    </div>
    <div className="demo-ribbon">{concept.services.map(service => <span key={service}>{service}</span>)}</div>
    {expanded && <>
      <section className="demo-services" id={destination}>
        <h3>{concept.sectionTitle}</h3>
        <div className="demo-service-grid">{concept.services.map((service, index) => <div key={service}><h4>{service}</h4><p>{concept.serviceDescriptions?.[index]}</p></div>)}</div>
      </section>
      {concept.feature && <section className="demo-feature"><h3>{concept.feature.title}</h3><p>{concept.feature.text}</p></section>}
      <section className="demo-about" id={about}><span className="demo-brand">{concept.brand}</span><div><h3>{concept.aboutTitle}</h3><p>{concept.aboutCopy}</p></div></section>
      <div className="demo-end"><span>{concept.brand}</span><span>Estudo conceitual por DIGIPROT</span></div>
    </>}
  </div>
}
