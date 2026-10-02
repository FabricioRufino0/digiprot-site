import { useState } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowUpRight, Monitor, Smartphone } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import BrowserFrame from './BrowserFrame'
import { projects } from '@/data/projects'

function ProjectCard({ project }) {
  const [format, setFormat] = useState('desktop')
  const [keyboard, setKeyboard] = useState(false)
  const reduce = useReducedMotion()

  return <article className={`project project-${project.id}`}>
    <Tabs value={format} onValueChange={setFormat} className="project-format-tabs" onKeyDownCapture={() => setKeyboard(true)} onPointerDownCapture={() => setKeyboard(false)}>
      <TabsList aria-label={`Formato da prévia do site da ${project.name}`} className="format-controls project-format-controls">
        <TabsTrigger value="desktop"><Monitor aria-hidden="true" />Computador</TabsTrigger>
        <TabsTrigger value="mobile"><Smartphone aria-hidden="true" />Celular</TabsTrigger>
      </TabsList>
      <m.div layout={!reduce && !keyboard} className="project-format-stage">
        {['desktop', 'mobile'].map(value => (
          <TabsContent key={value} value={value} className="project-format-panel">
            <m.div
              layout={!reduce && !keyboard}
              layoutId={format === value && !reduce && !keyboard ? `${project.id}-responsive-preview` : undefined}
              transition={{ duration: keyboard ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
              className={`project-format-frame project-format-${value}`}
            >
              <a className="project-preview" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar o site da ${project.name} (nova aba)`}>
                <div className="project-camera"><BrowserFrame project={project} mobile={value === 'mobile'} /></div>
                <span className="preview-visit"><ArrowUpRight aria-hidden="true" /></span>
              </a>
              <p className="capture-caption">Captura real · {value === 'mobile' ? '390' : '1440'} px de largura</p>
            </m.div>
          </TabsContent>
        ))}
      </m.div>
    </Tabs>
    <div className="project-info">
      <div><p className="project-business">Cliente DIGIPROT · {project.business}</p><h3><a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}<ArrowUpRight aria-hidden="true" /></a></h3></div>
      <p>{project.summary}</p>
    </div>
  </article>
}

export default function ProjectShowcase() {
  return <section className="projects shell section-space" id="projetos" aria-labelledby="projects-title">
    <div className="section-heading"><h2 id="projects-title">Sites feitos pela<br />DIGIPROT.</h2><p>Cada negócio tem sua identidade. Veja como ela aparece nos sites que criamos.</p></div>
    <div className="project-grid">{projects.map(project => <ProjectCard project={project} key={project.id} />)}</div>
  </section>
}
