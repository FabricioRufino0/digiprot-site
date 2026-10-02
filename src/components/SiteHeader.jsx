import { useRef } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { commercialUrl } from '@/data/projects'

export default function SiteHeader({ currentPage = 'home' }) {
  const home = currentPage === 'examples' ? '/' : ''
  const links = [
    [`${home}#projetos`, 'Clientes'],
    [`${home}#entrega`, 'O que fazemos'],
    [currentPage === 'examples' ? '#modelos' : '/exemplos/', 'Exemplos'],
  ]
  const menu = useRef(null)
  const keyboard = useRef(false)
  const menuAnimation = useRef(null)
  function closeMenu() { menu.current.open = false }
  function animateMenu() {
    menuAnimation.current?.cancel()
    if (!menu.current.open || keyboard.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    menuAnimation.current = menu.current.querySelector('nav').animate([
      { opacity: 0, transform: 'translateY(-8px) scale(.98)' },
      { opacity: 1, transform: 'translateY(0px) scale(1)' },
    ], { duration: 180, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })
  }
  return <header className="site-header shell">
    <a className="brand" href={`${home}#inicio`} aria-label="DIGIPROT, início"><img src="/assets/identity/digiprot-logo.webp" alt="DIGIPROT" width="600" height="200" /></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([href, label]) => <a key={href} href={href} aria-current={currentPage === 'examples' && href === '#modelos' ? 'page' : undefined}>{label}</a>)}</nav>
    <a className="header-contact" href={commercialUrl} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight aria-hidden="true" /></a>
    <details className="mobile-menu" ref={menu} onToggle={animateMenu} onPointerDown={() => { keyboard.current = false }} onKeyDown={event => { keyboard.current = true; menuAnimation.current?.cancel(); if (event.key === 'Escape') { closeMenu(); menu.current.querySelector('summary').focus() } }}>
      <summary aria-label="Menu de navegação"><Menu className="menu-open-icon" aria-hidden="true" /><X className="menu-close-icon" aria-hidden="true" /></summary>
      <nav aria-label="Navegação móvel">{links.map(([href, label]) => <a key={href} href={href} aria-current={currentPage === 'examples' && href === '#modelos' ? 'page' : undefined} onClick={closeMenu}>{label}</a>)}<a href={commercialUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Falar com a DIGIPROT</a></nav>
    </details>
  </header>
}
