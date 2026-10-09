'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button, Heading, Label, Stack, Text, TextInput, Textarea, Select, FormControl } from '@primer/react'
import { ArrowUpRightIcon, ChevronRightIcon, CheckCircleFillIcon, MailIcon, MarkGithubIcon, PeopleIcon } from '@primer/octicons-react'

export const projects = [
  { slug: 'northstar', name: 'Northstar', type: 'AI product', year: '2026', description: 'An intelligent planning workspace that turns ambiguity into momentum.', tags: ['Next.js', 'AI', 'Product design'], tone: 'var(--bgColor-accent-muted)' },
  { slug: 'fieldnotes', name: 'Fieldnotes', type: 'Editorial website', year: '2025', description: 'A considered digital home for a studio making tools for curious teams.', tags: ['Web design', 'CMS', 'Motion'], tone: 'var(--bgColor-accent-muted)' },
  { slug: 'relay', name: 'Relay', type: 'Web application', year: '2025', description: 'A calm, fast operating layer for distributed customer teams.', tags: ['React', 'Dashboard', 'Systems'], tone: 'var(--bgColor-attention-muted)' },
  { slug: 'arcade', name: 'Arcade', type: 'Interactive experience', year: '2024', description: 'A playful product launch that makes complex technology feel human.', tags: ['WebGL', 'Storytelling', 'Frontend'], tone: 'var(--bgColor-danger-muted)' },
  { slug: 'common-ground', name: 'Common Ground', type: 'Brand website', year: '2024', description: 'A sharper, more useful web presence for a growing architecture practice.', tags: ['Strategy', 'Identity', 'Build'], tone: 'var(--bgColor-neutral-muted)' },
  { slug: 'signal', name: 'Signal', type: 'AI experiment', year: '2026', description: 'A small research tool for finding the thread inside a messy brief.', tags: ['AI', 'Prototype', 'UX'], tone: 'var(--bgColor-done-muted)' },
]

const nav = [['Work', '/work'], ['Services', '/services'], ['Process', '/process'], ['About', '/about'], ['Lab', '/lab']]

const spring = { type: 'spring' as const, stiffness: 90, damping: 18, mass: 0.7 }

export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={false} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={reduce ? undefined : { ...spring, delay }}>{children}</motion.div>
}

export function SplitText({ children }: { children: string }) {
  const reduce = useReducedMotion()
  return <span className="split-text" aria-label={children}>{children.split(' ').map((word, index) => <motion.span key={`${word}-${index}`} aria-hidden="true" initial={false} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={reduce ? undefined : { ...spring, delay: index * 0.055 }}><span>{word}</span>{' '}</motion.span>)}</span>
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <motion.header className="site-header" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }}>
    <Link href="/" className="wordmark" aria-label="Faisal home"><span className="wordmark-mark">F</span><span>Faisal<span className="muted">/builds</span></span></Link>
    <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
      {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>Start a project <ArrowUpRightIcon size={14} /></Link>
    </nav>
    <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
  </motion.header>
}

export function SiteFooter() {
  return <footer className="site-footer"><Stack direction="vertical" gap="spacious"><div className="footer-top"><div><Text as="p" className="eyebrow">Have a good one?</Text><Heading as="h2" variant="large">Let&apos;s make<br /><em>something useful.</em></Heading></div><Link href="/contact" className="circle-link" aria-label="Start a project"><ArrowUpRightIcon size={24} /></Link></div><div className="footer-bottom"><Text size="small">© 2026 Faisal. Built with care.</Text><Stack direction="horizontal" gap="normal"><a href="mailto:hello@faisal.build"><MailIcon size={16} /> Email</a><a href="https://github.com" target="_blank" rel="noreferrer"><MarkGithubIcon size={16} /> GitHub</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></Stack></div></Stack></footer>
}

export function PageFrame({ children, eyebrow, title, intro }: { children: React.ReactNode; eyebrow: string; title: React.ReactNode; intro?: string }) {
  return <><SiteHeader /><main><section className="page-intro"><Reveal><Text className="eyebrow">{eyebrow}</Text></Reveal><Reveal delay={0.08}><Heading as="h1" variant="large" className="page-title">{title}</Heading></Reveal>{intro && <Reveal delay={0.16}><Text as="p" className="page-intro-copy">{intro}</Text></Reveal>}</section>{children}</main><SiteFooter /></>
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return <div className="section-heading"><div><Text className="eyebrow">{eyebrow}</Text><Heading as="h2" variant="large">{title}</Heading></div>{children && <Text className="section-heading-note">{children}</Text>}</div>
}

export function ProjectCard({ project, featured = false }: { project: typeof projects[number]; featured?: boolean }) {
  return <Reveal className={featured ? 'project-card-wrap featured' : 'project-card-wrap'}><Link href={`/work/${project.slug}`} className={featured ? 'project-card featured' : 'project-card'}><div className="project-art" style={{ background: project.tone }}><span className="art-index">{String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, '0')}</span><div className="art-window"><div className="art-line long" /><div className="art-line" /><div className="art-block" /><div className="art-block small" /></div><ArrowUpRightIcon className="art-arrow" size={20} /></div><div className="project-meta"><div><Text className="eyebrow">{project.type} · {project.year}</Text><Heading as="h3">{project.name}</Heading></div><ChevronRightIcon size={20} /></div><Text>{project.description}</Text><div className="tag-row">{project.tags.map(tag => <Label key={tag}>{tag}</Label>)}</div></Link></Reveal>
}

export function CTA() { return <section className="cta"><Text className="eyebrow">Next move</Text><Heading as="h2" variant="large">Have something<br /><em>worth building?</em></Heading><Text as="p">Tell me what you&apos;re working toward. I&apos;ll reply with a clear point of view and the next practical step.</Text><Link href="/contact" className="button button-dark">Start a conversation <ArrowUpRightIcon size={16} /></Link></section> }

export function ContactForm() {
  return <form className="contact-form" action="mailto:hello@faisal.build" method="post" encType="text/plain"><div className="form-grid"><FormControl><FormControl.Label>Name</FormControl.Label><TextInput name="name" placeholder="Your name" required /></FormControl><FormControl><FormControl.Label>Email</FormControl.Label><TextInput name="email" type="email" placeholder="you@company.com" required /></FormControl></div><FormControl><FormControl.Label>Company / project</FormControl.Label><TextInput name="project" placeholder="What are we calling it?" /></FormControl><div className="form-grid"><FormControl><FormControl.Label>Project type</FormControl.Label><Select name="type" defaultValue="website"><Select.Option value="website">Website</Select.Option><Select.Option value="app">Web application</Select.Option><Select.Option value="ai">AI product</Select.Option><Select.Option value="other">Something else</Select.Option></Select></FormControl><FormControl><FormControl.Label>Budget range</FormControl.Label><Select name="budget" defaultValue="unsure"><Select.Option value="unsure">Not sure yet</Select.Option><Select.Option value="small">$3k — $8k</Select.Option><Select.Option value="medium">$8k — $20k</Select.Option><Select.Option value="large">$20k+</Select.Option></Select></FormControl></div><FormControl><FormControl.Label>What are you trying to build?</FormControl.Label><Textarea name="message" placeholder="A little context is plenty. What is the opportunity, and where are you stuck?" rows={6} required /></FormControl><Button variant="primary" size="large" type="submit">Send enquiry <ArrowUpRightIcon size={16} /></Button></form>
}

export function FeatureList({ items }: { items: string[] }) { return <Stack direction="vertical" gap="condensed">{items.map(item => <div className="feature-item" key={item}><CheckCircleFillIcon size={16} /><Text>{item}</Text></div>)}</Stack> }
export function SocialProof() { return <div className="social-proof"><PeopleIcon size={18} /><Text>Built for people who care about the details.</Text></div> }

export function SignalRoom() {
  const [active, setActive] = useState(0)
  const signals = ['clarity', 'momentum', 'edge']
  return <section className="signal-room" aria-labelledby="signal-room-title"><div className="signal-copy"><Text className="eyebrow">The Faisal signal room</Text><Heading as="h2" variant="large" id="signal-room-title">Good work is a <em>living system.</em></Heading><Text as="p">Move your cursor through the field. Each signal is a different way I make a project feel less ordinary.</Text><div className="signal-tabs" role="tablist">{signals.map((signal, index) => <button key={signal} className={active === index ? 'signal-tab active' : 'signal-tab'} onClick={() => setActive(index)} role="tab" aria-selected={active === index}>{`0${index + 1}`} {signal}</button>)}</div></div><div className={`signal-field signal-${signals[active]}`} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`) }}><div className="signal-core" /><div className="signal-ring ring-one" /><div className="signal-ring ring-two" /><div className="signal-ring ring-three" /><span className="signal-label">{signals[active]} / online</span></div></section>
}

export const serviceData = [
  { number: '01', title: 'Websites', text: 'Premium marketing sites for businesses, startups, creators, and organizations that have outgrown “good enough.”', deliver: 'Strategy, art direction, responsive build, CMS, launch.', price: 'Projects from $4k' },
  { number: '02', title: 'Web applications', text: 'Complex interfaces, dashboards, internal tools, and SaaS products that need to feel clear at every scale.', deliver: 'UX structure, component systems, frontend engineering, QA.', price: 'Projects from $8k' },
  { number: '03', title: 'AI integration', text: 'Useful AI features that fit the product instead of feeling bolted on: assistants, search, automation, and workflows.', deliver: 'Product thinking, model integration, prompts, evaluation, iteration.', price: 'Projects from $6k' },
  { number: '04', title: 'Redesigns', text: 'A sharper, more effective experience for a site that has lost its edge or no longer reflects the business.', deliver: 'Audit, information architecture, visual refresh, rebuild.', price: 'Projects from $5k' },
]

export const processData = [
  ['01', 'Discover', 'Understand the business, audience, goals, and the problem underneath the brief.'],
  ['02', 'Define', 'Turn the requirements into a clear structure, creative direction, and technical plan.'],
  ['03', 'Build', 'Design and implement the experience with close attention to the details people feel.'],
  ['04', 'Refine', 'Test responsiveness, interactions, accessibility, performance, and the edge cases.'],
  ['05', 'Launch', 'Deploy, monitor, document, and hand over a product your team can own.'],
  ['06', 'Improve', 'Keep learning from real-world usage and make the next version even better.'],
]

export const experiments = [
  ['Cursor studies', 'Interaction', 'A set of tiny interface moments exploring attention, anticipation, and feedback.'],
  ['Brief → signal', 'AI prototype', 'A private tool that finds the important thread inside a messy project brief.'],
  ['One-screen weather', 'UI study', 'What if a forecast behaved more like a quiet morning paper than an app?'],
  ['Type as material', 'Visual experiment', 'Letters that respond to proximity, rhythm, and the pace of a page.'],
  ['Tiny tools', 'Productivity', 'Small utilities for thinking better: timers, sorters, and gentle constraints.'],
  ['Unfinished / useful', 'Research', 'A running shelf of ideas that are not ready to ship, but worth keeping.'],
]

export const tools = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'AI APIs', 'Convex', 'GitHub', 'Vercel']
export const strengths = ['Clear thinking before code', 'High standards for the last 10%', 'Fast, honest communication', 'Systems that stay maintainable']

