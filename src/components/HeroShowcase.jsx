import { useRef, useState } from 'react'
import { ArrowRight, ArrowDown, Pause, Play } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import BrowserFrame from './BrowserFrame'
import { projects, commercialUrl } from '@/data/projects'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function HeroShowcase() {
  const chapter = useRef(null)
  const idle = useRef(null)
  const orbit = useRef(null)
  const userPaused = useRef(false)
  const [paused, setPaused] = useState(false)
  const [motionReady, setMotionReady] = useState(false)
  function toggleMotion() {
    userPaused.current = !userPaused.current
    setPaused(userPaused.current)
    if (userPaused.current) { idle.current?.pause(); orbit.current?.pause() }
    else { idle.current?.play(); orbit.current?.play() }
  }

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      setMotionReady(true)
      gsap.set('.hero-laptop', { transformPerspective: 1400, rotationY: -13, rotationX: 8, rotationZ: -7 })
      const assembly = gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero-word', { yPercent: 110, rotation: 4, duration: 0.72, stagger: 0.06 }, 0.06)
        .from('.hero-copy > p', { y: 12, opacity: 0, duration: 0.5 }, 0.22)
        .from('.hero-ring-motion', { rotation: -12, scale: 0.9, opacity: 0, duration: 1.25 }, 0)
        .from('.hero-device-motion', { y: 28, x: 20, rotation: 3, scale: 0.95, opacity: 0, duration: 0.9 }, 0.05)
        .from('.laptop-deck', { opacity: 0, duration: 0.55 }, 0.12)
        .fromTo('.laptop-lid', { rotationX: 22, transformPerspective: 1400 }, { rotationX: 0, duration: 1.05, ease: 'power3.out' }, 0.12)
        .from('.laptop-keyboard, .laptop-trackpad', { opacity: 0, y: 8, stagger: 0.06, duration: 0.4 }, 0.4)
        .from('.hero-phone-motion', { y: 28, x: 14, rotationY: -18, rotationZ: 12, scale: 0.94, opacity: 0, duration: 0.95 }, 0.3)
        .fromTo('.screen-light', { xPercent: -110 }, { xPercent: 110, duration: 0.65 }, 0.65)
      const floating = gsap.timeline({ repeat: -1, yoyo: true, paused: true, defaults: { duration: 3.6, ease: 'sine.inOut' } })
        .to('.hero-laptop-float', { y: -8, rotation: 1 }, 0)
        .to('.hero-phone-float', { y: 10, rotation: -2 }, 0)
        .to('.hero-floor', { opacity: 0.45, scaleX: 0.8 }, 0)
      idle.current = floating
      const breathing = gsap.fromTo('.hero-ring-float', { rotation: -6 }, { rotation: 6, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true })
      orbit.current = breathing
      let visible = false
      const update = () => {
        if (!visible || document.hidden) assembly.progress(1)
        const playing = visible && !document.hidden && !userPaused.current && assembly.progress() === 1
        floating.paused(!playing)
        breathing.paused(!playing)
      }
      assembly.eventCallback('onComplete', update)
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
      observer.observe(chapter.current.querySelector('.hero'))
      document.addEventListener('visibilitychange', update)
      return () => {
        setMotionReady(false); idle.current = null; orbit.current = null
        observer.disconnect(); document.removeEventListener('visibilitychange', update)
      }
    })

    media.add('(min-width: 900px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set('.scene-caption', { autoAlpha: 0, y: 30 })
      gsap.set('.scene-track i', { scaleX: 0, transformOrigin: 'left' })
      const journey = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        trigger: chapter.current, start: 'top top', end: 'bottom bottom', scrub: 0.16, invalidateOnRefresh: true,
      } })
        .addLabel('computador', 0)
        .to('.hero-copy h1, .hero-copy > p', { y: -65, opacity: 0, duration: 0.16 }, 0.04)
        .to('.hero-art', { x: () => -chapter.current.clientWidth * 0.07, duration: 0.32 }, 0.04)
        .to('.hero-device-scroll', { xPercent: -8, yPercent: -10, scale: 1.07, duration: 0.32 }, 0.04)
        .to('.hero-laptop', { rotationY: 0, rotationX: 0, rotationZ: 0, duration: 0.32 }, 0.04)
        .to('.hero-phone-scroll', { xPercent: 35, yPercent: 22, rotation: -8, scale: 0.85, duration: 0.3 }, 0.04)
        .to('.hero-ring-scroll', { rotation: 10, scale: 1.04, duration: 0.36 }, 0.04)
        .to('.scene-caption-desktop', { autoAlpha: 1, y: 0, duration: 0.12 }, 0.17)
        .to('.scene-caption-desktop', { autoAlpha: 0, y: -25, duration: 0.1 }, 0.35)
        .addLabel('celular', 0.38)
        .to('.hero-device-scroll', { xPercent: 22, yPercent: -10, scale: 0.8, duration: 0.3 }, 0.38)
        .to('.hero-laptop', { rotationY: 28, rotationX: 8, rotationZ: -5, duration: 0.3 }, 0.38)
        .to('.hero-phone-scroll', { xPercent: -180, yPercent: -9, rotation: -8, scale: 1.45, duration: 0.3 }, 0.38)
        .to('.hero-phone', { rotation: 0, duration: 0.3 }, 0.38)
        .to('.hero-ring-scroll', { rotation: -14, scale: 1.08, duration: 0.32 }, 0.38)
        .to('.scene-caption-mobile', { autoAlpha: 1, y: 0, duration: 0.12 }, 0.5)
        .addLabel('conjunto', 0.75)
        .to('.scene-caption-mobile', { autoAlpha: 0, y: -25, duration: 0.1 }, 0.77)
        .to('.hero-art', { x: 0, scale: 1, duration: 0.25 }, 0.75)
        .to('.hero-device-scroll', { xPercent: 0, yPercent: 0, scale: 1, duration: 0.25 }, 0.75)
        .to('.hero-laptop', { rotationY: -13, rotationX: 8, rotationZ: -7, duration: 0.25 }, 0.75)
        .to('.hero-phone-scroll', { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, duration: 0.25 }, 0.75)
        .to('.hero-phone', { rotation: 8, duration: 0.25 }, 0.75)
        .to('.hero-ring-scroll', { rotation: 0, scale: 1, duration: 0.25 }, 0.75)
        .to('.hero-copy h1, .hero-copy > p', { y: 0, opacity: 1, duration: 0.15 }, 0.85)
        .to('.scene-track i:nth-child(1)', { scaleX: 1, duration: 0.34 }, 0)
        .to('.scene-track i:nth-child(2)', { scaleX: 1, duration: 0.34 }, 0.34)
        .to('.scene-track i:nth-child(3)', { scaleX: 1, duration: 0.32 }, 0.68)
      const settleForKeyboard = event => {
        if (!event.target.matches(':focus-visible')) return
        if (window.scrollY > journey.scrollTrigger.start && window.scrollY < journey.scrollTrigger.end) {
          window.scrollTo({ top: journey.scrollTrigger.end, behavior: 'instant' })
          journey.progress(1)
        }
      }
      chapter.current.addEventListener('focusin', settleForKeyboard)
      return () => { chapter.current?.removeEventListener('focusin', settleForKeyboard) }
    })

    media.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.hero-art', start: 'top 10%', end: 'bottom top', scrub: 0.12 } })
        .to('.hero-ring-scroll', { rotation: 8 }, 0)
        .to('.hero-phone-scroll', { y: -20, rotation: -5 }, 0)
        .to('.hero-laptop', { rotationY: 8, rotationZ: -2 }, 0)
    })

    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const art = chapter.current.querySelector('.hero-art')
      const depth = chapter.current.querySelector('.hero-depth')
      const moveX = gsap.quickTo(depth, 'rotationY', { duration: 0.22, ease: 'power3.out' })
      const moveY = gsap.quickTo(depth, 'rotationX', { duration: 0.22, ease: 'power3.out' })
      gsap.set(depth, { transformPerspective: 1800 })
      let bounds
      const invalidateBounds = () => { bounds = undefined }
      const resize = new ResizeObserver(invalidateBounds)
      resize.observe(art)
      const move = event => {
        const box = bounds ??= art.getBoundingClientRect()
        moveX(((event.clientX - box.left) / box.width - 0.5) * 12)
        moveY((0.5 - (event.clientY - box.top) / box.height) * 8)
      }
      const reset = () => { invalidateBounds(); moveX(0); moveY(0) }
      art.addEventListener('pointermove', move); art.addEventListener('pointerleave', reset)
      window.addEventListener('scroll', invalidateBounds, { passive: true })
      window.addEventListener('resize', invalidateBounds)
      return () => {
        resize.disconnect()
        art.removeEventListener('pointermove', move); art.removeEventListener('pointerleave', reset)
        window.removeEventListener('scroll', invalidateBounds); window.removeEventListener('resize', invalidateBounds)
      }
    })
    return () => media.revert()
  }, { scope: chapter })

  return <div className="hero-chapter" ref={chapter}>
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy"><h1 id="hero-title" aria-label="Seu negócio em foco."><span className="hero-word-mask"><span className="hero-word">Seu negócio</span></span><span className="hero-word-mask"><span className="hero-word">em foco<span className="focus-dot">.</span></span></span></h1><p>Sites com a identidade do seu negócio.<br className="desktop-break" /> Feitos para quem vai usar.</p><div className="hero-actions"><a className="action action-primary" href="#projetos">Ver clientes <ArrowRight aria-hidden="true" /></a><a className="action action-outline" href={commercialUrl} target="_blank" rel="noopener noreferrer">Falar com a DIGIPROT</a></div></div>
      <div className="hero-art">
        <div className="hero-ring-scroll" aria-hidden="true"><div className="hero-ring-float"><div className="hero-ring-motion"><img className="hero-ring" src="/assets/focus-ring.svg" alt="" width="300" height="300" /></div></div></div>
        <div className="hero-depth">
        <div className="hero-floor" aria-hidden="true" />
        <div className="hero-device-scroll"><div className="hero-device-motion"><div className="hero-laptop-float"><div className="hero-laptop">
          <div className="laptop-lid"><BrowserFrame project={projects[0]} eager /><span className="screen-light" aria-hidden="true" /></div>
          <div className="laptop-deck" aria-hidden="true"><div className="laptop-keyboard">{Array.from({ length: 60 }, (_, index) => <i key={index} />)}</div><div className="laptop-trackpad" /><div className="laptop-deck-edge" /></div>
        </div></div></div></div>
        <div className="hero-phone-scroll"><div className="hero-phone-motion"><div className="hero-phone-float"><div className="hero-phone"><span className="phone-camera" aria-hidden="true" /><BrowserFrame project={projects[0]} mobile eager /><span className="phone-side" aria-hidden="true" /></div></div></div></div>
      </div></div>
      <div className="scene-captions" aria-hidden="true"><p className="scene-caption scene-caption-desktop">Nandices,<br /><span>no computador.</span></p><p className="scene-caption scene-caption-mobile">Nandices,<br /><span>no celular.</span></p></div>
      {motionReady && <button type="button" className="scene-motion-toggle" onClick={toggleMotion} title={paused ? 'Retomar movimento' : 'Pausar movimento'}>{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}<span className="sr-only">{paused ? 'Retomar movimento' : 'Pausar movimento'}</span></button>}
      <div className="hero-foot"><span className="hero-foot-description">Design e desenvolvimento para o seu negócio</span><div className="scene-scroll-cue" aria-hidden="true"><span>Role para explorar</span><span className="scene-track"><i /><i /><i /></span></div><a href="#projetos">Conheça os clientes <ArrowDown aria-hidden="true" /></a></div>
    </section>
  </div>
}
