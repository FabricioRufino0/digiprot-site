import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function PageMotion({ children }) {
  const page = useRef(null)

  useGSAP(() => {
    if (!CSS.supports('animation-timeline', 'scroll(root block)') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(page.current.querySelector('.scroll-progress'), { scaleX: 0 }, {
        scaleX: 1, ease: 'none', scrollTrigger: { trigger: page.current, start: 'top top', end: 'bottom bottom', scrub: true },
      })
    }
    const media = gsap.matchMedia()
    media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' }, context => {
      if (!context.conditions.motion) return
      const distance = context.conditions.desktop ? 32 : 16
      const entrances = []
      const reveal = (target, from, trigger = target) => {
        const elements = gsap.utils.toArray(target)
        if (!elements.length) return
        const tween = gsap.from(elements, {
          ...from, immediateRender: false, duration: 0.75, ease: 'power3.out', stagger: 0.06,
          scrollTrigger: { trigger, start: 'top 92%', once: true },
          onComplete() { gsap.set(elements, { clearProps: 'transform,opacity,clipPath' }) },
        })
        entrances.push(tween)
      }
      const select = gsap.utils.selector(page)
      entrances.push(gsap.from(select('.site-header > *'), { y: -10, opacity: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity' }))
      const heroActions = select('.hero-actions, .hero-foot')
      if (heroActions.length) entrances.push(gsap.from(heroActions, { y: 20, opacity: 0, duration: 0.85, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity' }))
      select('.section-heading').forEach(heading => reveal(heading.children, { y: distance, opacity: 0 }, heading))
      select('.project').forEach((project, index) => {
        reveal(project.querySelectorAll('.project-preview'), { clipPath: 'inset(12% 0 85% 0)', opacity: 0 }, project)
        project.querySelectorAll('.project-camera').forEach(camera => gsap.fromTo(camera, { scale: 1.16, rotationX: 12, rotationZ: index ? 4 : -4 }, { scale: 1, rotationX: 0, rotationZ: 0, transformPerspective: 1000, immediateRender: false, ease: 'none', scrollTrigger: { trigger: project, start: 'top 90%', end: 'top 30%', scrub: 0.7 } }))
        reveal(project.querySelector('.project-info').children, { y: 16, opacity: 0 }, project)
        reveal(project.querySelector('.project-format-controls'), { y: 12, opacity: 0 }, project)
      })
      reveal(select('.concept-stage'), { y: distance, opacity: 0 })
      reveal(select('.concept-carousel-info'), { y: 12, opacity: 0 })
      reveal(select('.examples-client-link'), { y: 12, opacity: 0 })
      reveal(select('.services-intro > *'), { y: distance, opacity: 0 }, select('.services-intro')[0])
      reveal(select('.service-details > *'), { y: 20, opacity: 0 }, select('.service-details')[0])
      reveal(select('.contact > *'), { y: distance, opacity: 0 }, select('.contact')[0])
      reveal(select('.footer-top > *'), { y: 12, opacity: 0 }, select('.site-footer')[0])
      reveal(select('.footer-bottom > *'), { y: 8, opacity: 0 }, select('.site-footer')[0])
      const showFocusedContent = event => {
        entrances.forEach(tween => {
          if (tween.targets().some(target => target === event.target || target.contains(event.target))) tween.progress(1)
        })
      }
      page.current.addEventListener('focusin', showFocusedContent)
      let mounted = true
      if (document.fonts.status !== 'loaded') document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh() })
      return () => { mounted = false; page.current?.removeEventListener('focusin', showFocusedContent) }
    })
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = gsap.utils.toArray('.project-preview').map(preview => {
        const frame = preview.querySelector('.browser-frame')
        gsap.set(frame, { transformPerspective: 900 })
        const tiltX = gsap.quickTo(frame, 'rotationX', { duration: 0.5, ease: 'power3.out' })
        const tiltY = gsap.quickTo(frame, 'rotationY', { duration: 0.5, ease: 'power3.out' })
        let bounds
        const invalidateBounds = () => { bounds = undefined }
        const resize = new ResizeObserver(invalidateBounds)
        resize.observe(preview)
        const move = event => {
          const box = bounds ??= preview.getBoundingClientRect()
          tiltX((0.5 - (event.clientY - box.top) / box.height) * 5)
          tiltY(((event.clientX - box.left) / box.width - 0.5) * 5)
        }
        const reset = () => { invalidateBounds(); tiltX(0); tiltY(0) }
        preview.addEventListener('pointermove', move)
        preview.addEventListener('pointerleave', reset)
        window.addEventListener('scroll', invalidateBounds, { passive: true })
        window.addEventListener('resize', invalidateBounds)
        return () => {
          resize.disconnect()
          preview.removeEventListener('pointermove', move); preview.removeEventListener('pointerleave', reset)
          window.removeEventListener('scroll', invalidateBounds); window.removeEventListener('resize', invalidateBounds)
        }
      })
      return () => cleanups.forEach(cleanup => cleanup())
    })
    return () => media.revert()
  }, { scope: page })

  return <div ref={page} className="page-motion" id="inicio"><div className="scroll-progress" aria-hidden="true" />{children}</div>
}
