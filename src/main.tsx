import { StrictMode, useEffect, useRef, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Check, ChevronDown, Copy, Download, ExternalLink, Github, GraduationCap, Images, Linkedin, Mail, MapPin, Menu, Phone, UserRound, X, ZoomIn } from 'lucide-react'
import { content, links, projectImages, type Language, type ProjectKey } from './content'
import './styles.css'

function ExternalLinkButton({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

function ProjectGallery({ project, language }: { project: ProjectKey; language: Language }) {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const images = projectImages[project]
  const current = images[selected]
  const t = content[language].work.gallery
  const name = content[language].work[project].name
  const changeImage = (direction: number) => setSelected(index => (index + direction + images.length) % images.length)

  useEffect(() => {
    if (!expanded) { dialog.current?.close(); return }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => { document.body.style.overflow = previousOverflow }
  }, [expanded])

  return <div className="project-gallery">
    <figure>
      <button className={`screenshot-button ${current.height > current.width ? 'portrait' : ''}`} type="button" onClick={() => setExpanded(true)} aria-label={`${t.enlarge}: ${current[language]}`}>
        <img src={current.src} alt={`${name} — ${current[language]}`} width={current.width} height={current.height} loading="lazy" decoding="async" />
        <span className="zoom-label"><ZoomIn size={16} />{t.hint}</span>
      </button>
      <figcaption><span>{current[language]}</span><span>{String(selected + 1).padStart(2, '0')} / 04</span></figcaption>
    </figure>
    <div className="gallery-options" role="group" aria-label={`${name} — ${t.caption}`}>
      {images.map((image, index) => <button type="button" key={image.src} aria-pressed={selected === index} onClick={() => setSelected(index)}>
        <span className="thumbnail"><img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" /></span>
        <span>{image[language]}</span>
      </button>)}
    </div>
    <dialog ref={dialog} className="image-dialog" aria-label={`${name} — ${t.caption}`} onCancel={event => { event.preventDefault(); setExpanded(false) }} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false) }} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); changeImage(-1) } if (event.key === 'ArrowRight') { event.preventDefault(); changeImage(1) } }}>
      <div className="lightbox-content">
        <div className="lightbox-header"><span>{name} <small>{current[language]}</small></span><button className="icon-button" type="button" onClick={() => setExpanded(false)} aria-label={t.close}><X size={23} aria-hidden="true" /></button></div>
        {expanded && <div className="lightbox-image"><img src={current.src} alt={`${name} — ${current[language]}`} width={current.width} height={current.height} /></div>}
        <div className="lightbox-controls"><button className="icon-button" type="button" aria-label={t.previous} onClick={() => changeImage(-1)}><ArrowLeft size={20} aria-hidden="true" /></button><span aria-live="polite">{selected + 1} / {images.length}</span><button className="icon-button" type="button" aria-label={t.next} onClick={() => changeImage(1)}><ArrowRight size={20} aria-hidden="true" /></button></div>
      </div>
    </dialog>
  </div>
}

function ProjectCard({ project, language, index }: { project: ProjectKey; language: Language; index: number }) {
  const t = content[language].work
  const p = t[project]
  return <article className="project" id={project === 'eco' ? 'ecoquest' : 'freshtrace'}>
    <div className="project-heading"><div><span className="project-category">{p.category}</span><h3><span className="project-number">0{index}</span>{p.name}</h3></div><span className="project-date">{p.date}</span></div>
    <div className="project-layout">
      <ProjectGallery project={project} language={language} />
      <div className="project-info">
        <p className="project-description">{p.description}</p>
        <div className="project-role"><span>{t.roleLabel}</span><b>{p.role}</b></div>
        <ul className="project-highlights">{p.highlights.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
        <div className="stack-label">{t.stackLabel}</div><div className="tech-tags">{p.stack.map(item => <span key={item}>{item}</span>)}</div>
        <div className="project-actions"><ExternalLinkButton href={project === 'eco' ? links.ecoquest : links.freshtrace} className="button button-small button-secondary"><Github size={17} />{t.code}<ArrowUpRight size={15} /></ExternalLinkButton>{project === 'fresh' && <ExternalLinkButton href={links.freshtraceLive} className="button button-small button-primary">{t.live}<ExternalLink size={15} /></ExternalLinkButton>}</div>
      </div>
    </div>
    <details className="project-details"><summary>{t.details}<ChevronDown size={18} /></summary><div className="details-body"><h4>{p.detailTitle}</h4><p>{p.detail}</p><ol className="project-flow">{p.flow.map((step, i) => <li key={step}><span>{i + 1}</span>{step}{i < p.flow.length - 1 && <ArrowRight size={15} aria-hidden="true" />}</li>)}</ol></div></details>
  </article>
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('portfolio-language') === 'vi' ? 'vi' : 'en' } catch { return 'en' }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const t = content[language]

  useEffect(() => {
    document.documentElement.lang = language
    try { localStorage.setItem('portfolio-language', language) } catch { /* Storage may be disabled. */ }
  }, [language])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() } }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2300)
    } catch { window.location.href = `mailto:${links.email}` }
  }

  return <>
    <a className="skip-link" href="#main">{t.nav.skip}</a>
    <header className="site-header" id="top"><div className="container header-inner">
      <a className="brand" href="#top" aria-label="Phan Chí Cường"><span className="brand-mark"><img src="/logo.png" alt="" width="1254" height="1254" /></span><span>Phan Chí Cường</span></a>
      <nav id="main-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#work" onClick={() => setMenuOpen(false)}>{t.nav.work}</a><a href="#expertise" onClick={() => setMenuOpen(false)}>{t.nav.expertise}</a><a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a><a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
      </nav>
      <div className="header-tools"><div className="language-switch" role="group" aria-label="Language"><button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button><button type="button" aria-pressed={language === 'vi'} onClick={() => setLanguage('vi')}>VI</button></div><button ref={menuButton} className="menu-button icon-button" type="button" aria-controls="main-navigation" aria-label={menuOpen ? t.nav.close : t.nav.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div></header>

    <main id="main">
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-top"><span className="availability"><i />{t.hero.status}</span><span className="location"><MapPin size={14} />{t.hero.location}</span></div>
        <div className="hero-layout"><div className="hero-name"><p>{t.hero.greeting}</p><h1 id="hero-heading">Phan Chí<br /><span>Cường.</span></h1><h2>{t.hero.role}</h2></div><div className="hero-introduction"><p className="hero-intro">{t.hero.intro}</p><p className="hero-note">{t.hero.note}</p><div className="hero-actions"><a className="button button-primary" href="#work">{t.hero.primary}<ArrowDown size={17} /></a><a className="button button-secondary" href={links.resume} download>{t.hero.secondary}<Download size={17} /></a></div><div className="social-links"><span>{t.hero.socials}</span><ExternalLinkButton href={links.github}><Github size={16} />GitHub<ArrowUpRight size={14} /></ExternalLinkButton><ExternalLinkButton href={links.linkedin}><Linkedin size={16} />LinkedIn<ArrowUpRight size={14} /></ExternalLinkButton></div></div></div>
        <div className="hero-footer"><span><GraduationCap size={19} />{t.hero.education}</span><span>{t.hero.graduation}</span></div>
      </section>

      <section className="section work-section" id="work" aria-labelledby="work-heading"><div className="container"><div className="section-heading"><p className="eyebrow">{t.work.eyebrow}</p><h2 id="work-heading">{t.work.title}</h2><p className="section-intro">{t.work.intro}</p></div><ProjectCard project="eco" language={language} index={1} /><ProjectCard project="fresh" language={language} index={2} /></div></section>

      <section className="section skills-section" id="expertise" aria-labelledby="skills-heading"><div className="container skills-layout"><div className="section-heading"><p className="eyebrow">{t.skills.eyebrow}</p><h2 id="skills-heading">{t.skills.title}</h2><p className="section-intro">{t.skills.intro}</p></div><div className="skills-grid">{t.skills.groups.map(group => <div className="skill-group" key={group.name}><h3>{group.name}</h3><div>{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></div></section>

      <section className="section about-section" id="about" aria-labelledby="about-heading"><div className="container about-layout"><div className="about-copy"><p className="eyebrow">{t.about.eyebrow}</p><h2 id="about-heading">{t.about.title}</h2><p>{t.about.paragraph}</p><p>{t.about.second}</p><a className="text-link" href={links.resume} download>{t.nav.resume}<Download size={17} /></a></div><div className="education"><div className="education-label"><GraduationCap size={22} />{t.about.education}</div><h3>{t.about.school}</h3><p>{t.about.degree}</p><div className="education-dates"><span>{t.about.duration}</span><span>{t.about.graduation}</span></div><span className="gpa">{t.about.gpa}</span><div className="coursework"><h4>{t.about.courseworkLabel}</h4><p>{t.about.coursework}</p></div><div className="certification"><div><span>{t.about.certification}</span><b>{t.about.english}</b></div><span>{t.about.scores}</span></div></div></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="container contact-layout"><div><p className="eyebrow">{t.contact.eyebrow}</p><h2 id="contact-heading">{t.contact.title}<span>.</span></h2><p>{t.contact.intro}</p></div><div className="contact-right"><a className="email-link" href={`mailto:${links.email}`}>{links.email}<ArrowUpRight size={26} /></a><div className="contact-actions"><a className="button button-light" href={`mailto:${links.email}`}><Mail size={17} />{t.contact.email}</a><button className="button button-dark-outline" type="button" onClick={copyEmail}>{copied ? <Check size={17} /> : <Copy size={17} />}<span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span></button></div><div className="contact-social"><a href={`tel:${links.phone}`}><Phone size={16} />+84 989 902 105</a><ExternalLinkButton href={links.linkedin}><Linkedin size={16} />LinkedIn</ExternalLinkButton><ExternalLinkButton href={links.github}><Github size={16} />GitHub</ExternalLinkButton></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} {t.footer}</span><a href="#top">{t.contact.back}<ArrowUp size={15} /></a></div></footer>
    <nav className="mobile-dock" aria-label={language === 'en' ? 'Quick navigation' : 'Điều hướng nhanh'}><a href="#work"><Images size={19} /><span>{t.nav.work}</span></a><a href="#about"><UserRound size={19} /><span>{t.nav.about}</span></a><a href={links.resume} download><Download size={19} /><span>CV</span></a><a href="#contact"><Mail size={19} /><span>{t.nav.contact}</span></a></nav>
  </>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
