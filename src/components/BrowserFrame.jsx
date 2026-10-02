import { cn } from '@/lib/utils'
export default function BrowserFrame({ project, mobile = false, eager = false, className }) {
  const source = mobile ? project.mobileImage : project.desktopImage
  const originalWidth = mobile ? 390 : 1440
  const widths = mobile ? [192, 390] : [480, 720, 960, 1440]
  const srcSet = widths.map(width => `${width === originalWidth ? source : source.replace('.webp', `-${width}.webp`)} ${width}w`).join(', ')
  const sizes = mobile
    ? eager ? '(min-width: 900px) 11vw, 17vw' : '(min-width: 900px) 220px, 58vw'
    : eager ? '(min-width: 900px) 45vw, 65vw' : '(min-width: 900px) 48vw, 100vw'
  return <div className={cn('browser-frame', mobile && 'browser-frame-mobile', className)}>
    <div className="browser-bar" aria-hidden="true"><span className="browser-dots"><i /><i /><i /></span><span>{project.domain}</span><span className="browser-bar-end" /></div>
    <img src={source} srcSet={srcSet} sizes={sizes} alt={mobile ? `Versão para celular. ${project.alt}` : project.alt} width={originalWidth} height={mobile ? 844 : 960} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager && !mobile ? 'high' : 'auto'} decoding="async" />
  </div>
}
