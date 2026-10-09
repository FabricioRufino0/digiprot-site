import { ArrowUpRight } from 'lucide-react'
import { commercialUrl } from '@/data/projects'

const services = [
  {
    title: 'Um site com a sua identidade',
    summary: 'Seu negócio bem apresentado',
    content: 'Criamos um site com o visual da sua marca e organizamos o que você oferece. As informações ficam fáceis de encontrar, tanto no celular quanto no computador.',
  },
  {
    title: 'Seu site no ar',
    summary: 'Do endereço à publicação',
    content: 'Cuidamos dos passos para colocar o site na internet. O endereço fica registrado no seu nome. Antes de começar, combinamos o que será incluído para manter o site no ar e ligá-lo às ferramentas do seu negócio.',
  },
  {
    title: 'Seu negócio mais fácil de encontrar',
    summary: 'Contato à vista e ajuda depois da entrega',
    content: 'Preparamos o site para ajudar quem procura seus produtos ou serviços a encontrar seu negócio na internet. Seus contatos ficam à vista, para facilitar a conversa. Na proposta, combinamos como acompanhar as visitas e o apoio depois da entrega.',
  },
]

export default function ServiceSummary() {
  return (
    <section className="services shell section-space" id="entrega" aria-labelledby="services-title">
      <div className="services-layout">
        <div className="services-intro">
          <h2 id="services-title">Seu negócio,<br />bem apresentado.</h2>
          <p>A DIGIPROT cria sites com a identidade do seu negócio, serviços bem organizados e formas claras de contato pelo celular ou computador. Em cada página, organizamos as informações para que o cliente encontre o que procura e saiba como conversar com a empresa.</p>
        </div>
        <ul className="service-details">
          {services.map((service, index) => (
            <li key={service.title}>
              <details className="service-item" open={index === 0}>
                <summary className="service-trigger">
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
        <h2>O que seu negócio<br />precisa mostrar?</h2>
        <a className="action action-primary" href={commercialUrl} target="_blank" rel="noopener noreferrer">Conversar sobre meu site <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
