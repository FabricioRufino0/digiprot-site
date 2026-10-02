import MotionProvider from './components/MotionProvider'
import SiteHeader from './components/SiteHeader'
import HeroShowcase from './components/HeroShowcase'
import ProjectShowcase from './components/ProjectShowcase'
import ServiceSummary from './components/ServiceSummary'
import SiteFooter from './components/SiteFooter'
import PageMotion from './components/PageMotion'

export default function App() {
  return <MotionProvider><PageMotion><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader /><main id="conteudo"><HeroShowcase /><ProjectShowcase /><ServiceSummary /></main><SiteFooter /></PageMotion></MotionProvider>
}
