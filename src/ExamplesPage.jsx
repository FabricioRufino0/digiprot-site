import MotionProvider from './components/MotionProvider'
import SiteHeader from './components/SiteHeader'
import ConceptGallery from './components/ConceptGallery'
import SiteFooter from './components/SiteFooter'
import PageMotion from './components/PageMotion'

export default function ExamplesPage() {
  return <MotionProvider><PageMotion><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader currentPage="examples" /><main id="conteudo"><ConceptGallery standalone /></main><SiteFooter currentPage="examples" /></PageMotion></MotionProvider>
}
