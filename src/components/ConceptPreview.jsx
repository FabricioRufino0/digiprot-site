import { ArrowUpRight, Snowflake, Plus, Scissors, Flower2 } from 'lucide-react'

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

  return <div className={`demo-site demo-${concept.id}`} data-device={device} style={{ '--demo-paper': concept.color, '--demo-ink': concept.ink }}>
    <div className="demo-nav">
      <span className="demo-brand">{concept.brand}</span>
      <div className="demo-nav-links"><Action {...linkProps(destination)}>Explore</Action><Action {...linkProps(about)}>Nossa proposta</Action></div>
      <Action className="demo-nav-action" {...linkProps(destination)}>{concept.id === 'arquitetura' ? 'Ver projetos' : 'Conheça'}<ArrowUpRight aria-hidden="true" /></Action>
    </div>
    <div className="demo-hero">
      <div className="demo-copy">
        <span className="demo-category">{concept.name}</span>
        <Heading className="demo-headline">{concept.headline.split('\n').map(line => <span key={line}>{line}</span>)}</Heading>
        <p className="demo-intro">{concept.intro}</p>
        <Action className="demo-action" {...linkProps(destination)}>{concept.action}<ArrowUpRight aria-hidden="true" /></Action>
      </div>
      {concept.id === 'contabilidade' ? <div className="demo-soma-art" aria-hidden="true">
        <div className="soma-orbit"><Plus /><Plus /><Plus /></div>
        <div className="soma-note"><span>Uma visão mais clara</span><strong>Seu próximo<br />passo começa aqui.</strong><div className="soma-blocks"><i /><i /><i /><i /></div></div>
      </div> : <figure className="demo-photo">
        <img src={`/assets/concepts/photos/${concept.id}.webp`} alt={expanded ? concept.photoAlt : ''} width="300" height="300" loading={eager || expanded ? 'eager' : 'lazy'} decoding="async" />
      </figure>}
      {concept.id === 'climatizacao' && <span className="demo-seal" aria-hidden="true"><Snowflake /></span>}
      {concept.id === 'barbearia' && <span className="demo-seal" aria-hidden="true"><Scissors /></span>}
      {concept.id === 'estetica' && <span className="demo-seal" aria-hidden="true"><Flower2 /></span>}
      {concept.id === 'confeitaria' && <span className="demo-stamp" aria-hidden="true">feito com<br />carinho</span>}
    </div>
    <div className="demo-ribbon" aria-hidden="true">{concept.services.map(service => <span key={service}>{service}</span>)}</div>
    {expanded && <>
      <section className="demo-services" id={destination}>
        <p className="demo-small-label">Conheça as possibilidades</p>
        <h3>{concept.sectionTitle}</h3>
        <div className="demo-service-grid">{concept.services.map((service, index) => <div key={service}><span className="demo-service-mark" aria-hidden="true">{['↗', '✳', '↗'][index]}</span><h4>{service}</h4><p>{[
          'Uma apresentação pensada para quem está conhecendo o negócio e quer entender o que ele oferece.',
          'Informações organizadas com cuidado, para encontrar o que importa e explorar as opções com calma.',
          'Um caminho simples entre conhecer a proposta e começar uma conversa com a empresa.',
        ][index]}</p></div>)}</div>
      </section>
      <section className="demo-about" id={about}><span className="demo-brand">{concept.brand}</span><div><h3>Uma ideia de site.<br />Muitas possibilidades.</h3><p>{concept.detail}</p></div></section>
      <div className="demo-end"><span>{concept.brand}</span><span>Estudo conceitual por DIGIPROT</span></div>
    </>}
  </div>
}
