import { ArrowUpRight, PenTool, Globe2, MousePointer2 } from 'lucide-react'
import { commercialUrl } from '@/data/projects'

const services = [
  {
    title: 'Um site com a sua identidade',
    icon: PenTool,
    summary: 'Sua marca e o que você oferece',
    content: 'Criamos o visual a partir da sua marca e organizamos seus produtos ou serviços. Quem visita encontra as informações de que precisa, no celular e no computador.',
  },
  {
    title: 'Seu site no ar',
    icon: Globe2,
    summary: 'Endereço, publicação e integrações',
    content: 'Cuidamos da publicação e registramos o endereço no seu nome. Antes de começar, definimos na proposta o que está incluído para manter o site no ar e conectá-lo às ferramentas que você usa.',
  },
  {
    title: 'Um caminho para chegar até você',
    icon: MousePointer2,
    summary: 'Contato à vista e ajuda depois da entrega',
    content: 'Preparamos o site para quem procura seus produtos ou serviços na internet e deixamos o contato fácil de encontrar. Também combinamos na proposta como acompanhar as visitas e qual será o apoio depois da entrega.',
  },
]

export default function ServiceSummary() {
  return (
    <section className="services shell section-space" id="entrega" aria-labelledby="services-title">
      <div className="services-layout">
        <div className="services-intro">
          <h2 id="services-title">O que seu cliente<br />precisa encontrar.</h2>
          <p>Criamos sites com a identidade do seu negócio, serviços fáceis de entender e contato à vista. Conheça projetos e exemplos da DIGIPROT.</p>
        </div>
        <ul className="service-details">
          {services.map((service, index) => (
            <li key={service.title}>
              <details className="service-item" open={index === 0}>
                <summary className="service-trigger">
                  <service.icon className="service-icon" aria-hidden="true" />
                  <span className="service-heading">
                    <span className="service-title">{service.title}</span>
                    <span className="service-summary">{service.summary}</span>
                  </span>
                  <span className="service-toggle" aria-hidden="true" />
                </summary>
                <div className="service-content"><p>{service.content}</p></div>
              </details>
            </li>
          ))}
        </ul>
      </div>
      <div className="contact" id="contato">
        <div className="contact-copy"><h2>Vamos pensar<br />no seu site?</h2><a className="contact-link" href={commercialUrl} target="_blank" rel="noopener noreferrer">Conversar sobre meu site <ArrowUpRight aria-hidden="true" /></a></div>
        <a className="contact-orbit" href={commercialUrl} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a DIGIPROT pelo WhatsApp"><ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
