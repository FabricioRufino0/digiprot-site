import { LazyMotion, MotionConfig } from 'motion/react'

const importFeatures = () => import('@/lib/motion-features').then(module => module.default)
const loadFeatures = () => {
  const projects = document.getElementById('projetos')
  if (!projects) return importFeatures()
  return new Promise(resolve => {
    const load = () => {
      observer.disconnect()
      projects.removeEventListener('focusin', load)
      resolve(importFeatures())
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) load()
    }, { rootMargin: '200px' })
    observer.observe(projects.querySelector('.project-format-stage') ?? projects)
    projects.addEventListener('focusin', load, { once: true })
  })
}

export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user"><LazyMotion features={loadFeatures} strict>{children}</LazyMotion></MotionConfig>
}
