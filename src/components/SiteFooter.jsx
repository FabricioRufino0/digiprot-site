import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { commercialUrl, supportUrl } from '@/data/projects'

export default function SiteFooter({ currentPage = 'home' }) {
  const home = currentPage === 'examples' ? '/' : ''
  const examples = currentPage === 'examples' ? '#colecao' : '/exemplos/'

  return <footer className="site-footer shell">
    <div className="footer-top">
      <div className="footer-signoff">
        <a className="brand footer-brand" href={`${home}#inicio`} aria-label="DIGIPROT, voltar ao início">
          <img src="/assets/identity/digiprot-logo.webp" width="300" height="100" alt="DIGIPROT" loading="lazy" />
        </a>
        <p className="footer-description">Seu negócio na internet, com a sua identidade e contato fácil de encontrar.</p>
      </div>

      <nav className="footer-nav" aria-label="Explorar o site">
        <h2>Explorar</h2>
        <a href={`${home}#projetos`}>Sites de clientes</a>
        <a href={`${home}#entrega`}>O que fazemos</a>
        <a href={examples}>Exemplos</a>
      </nav>

      <nav className="footer-nav" aria-label="Contato">
        <h2>Contato</h2>
        <a href={commercialUrl} target="_blank" rel="noopener noreferrer">Conversar sobre um site <ArrowUpRight aria-hidden="true" /></a>
        <a href={supportUrl} target="_blank" rel="noopener noreferrer">Suporte técnico <ArrowUpRight aria-hidden="true" /></a>
      </nav>
    </div>

    <div className="footer-wordmark" aria-hidden="true">{'DIGIPROT'.split('').map((letter, index) => <span key={index}>{letter}</span>)}</div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} DIGIPROT.</p>
      <a className="footer-back" href={`${home}#inicio`}>Voltar ao início <ArrowUp aria-hidden="true" /></a>
    </div>
  </footer>
}
