import Link from 'next/link';
import AuthButton from '@/components/auth-button';

const connections = [
  { label: 'Email', glyph: '@' },
  { label: 'Calendar', glyph: '◇' },
  { label: 'AI assistants', glyph: '✦' },
  { label: 'Documents', glyph: '▤' },
];

export default function Home() {
  return (
    <main className="landing-shell">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="brand-mark">polynus<span>.</span></Link>
        <div className="flex items-center gap-5"><Link href="#how-it-works" className="hidden text-sm text-slate-400 hover:text-white sm:block">How it works</Link><Link href="/connect" className="text-sm text-slate-300 hover:text-white">Sign in</Link><AuthButton label="Start free" /></div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pb-36 lg:pt-24">
        <div>
          <p className="eyebrow">YOUR DAY, IN FOCUS</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-medium tracking-[-.055em] text-white sm:text-6xl lg:text-7xl">Make space for <em className="font-serif font-normal text-violet-300">what matters.</em></h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">Polynus turns the scattered signals from your AI work into a calm, mode-aware plan for your day.</p>
          <div className="mt-9 flex flex-wrap gap-3"><AuthButton label="Build my daily view" /><a href="#how-it-works" className="button-quiet">See the flow <span aria-hidden="true">↓</span></a></div>
          <p className="mt-7 text-xs text-slate-500">Private by design. You choose what Polynus can see.</p>
        </div>

        <div className="orbit-stage" aria-label="An abstract visualization of Polynus connecting your work modes">
          <div className="orbit-glow" /><div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" /><div className="orbit-ring orbit-ring-three" />
          <div className="orbit-core"><span>today</span><strong>Polynus</strong></div>
          <div className="orbit-node orbit-violet"><span>work</span></div><div className="orbit-node orbit-green"><span>learn</span></div><div className="orbit-node orbit-amber"><span>life</span></div>
          <div className="orbit-particle particle-one" /><div className="orbit-particle particle-two" /><div className="orbit-particle particle-three" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8"><div className="signal-strip"><p>One clear view, without forcing your life into one list.</p><div className="signal-modes"><span><i className="bg-violet-400" />Professional</span><span><i className="bg-emerald-400" />Academic</span><span><i className="bg-amber-400" />Personal</span></div></div></section>

      <section id="how-it-works" className="landing-section"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8"><div className="max-w-xl"><p className="eyebrow">A BETTER START TO THE DAY</p><h2 className="mt-4 text-4xl font-medium tracking-[-.04em] text-white sm:text-5xl">From scattered context to a considered next move.</h2></div><div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">{[['01','Connect what you choose','Bring in approved AI conversations today. Email, calendar, and document sources are designed to connect next.'],['02','See the signal','Polynus extracts commitments and groups them by the mode they belong to - not just the app they came from.'],['03','Move with clarity','Start with what needs attention, then go deeper when you need the context.']].map(([number,title,copy])=><article key={number} className="bg-[#10111b] p-7 sm:p-9"><p className="font-mono text-xs text-violet-300">{number}</p><h3 className="mt-12 text-xl font-medium text-white">{title}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">{copy}</p></article>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8"><div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#19152d] to-[#0e101a] p-7 sm:p-12"><p className="eyebrow">QUICK TO MAKE YOURS</p><div className="mt-5 grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><h2 className="text-4xl font-medium tracking-[-.04em] text-white">Your world, arranged around you.</h2><p className="mt-4 max-w-md leading-relaxed text-slate-400">Start with the context you already use. Polynus builds a daily view without asking you to abandon the tools that matter.</p><AuthButton label="Create your workspace" /></div><div className="connection-orbit">{connections.map((item,index)=><div className={`connection-pill connection-${index}`} key={item.label}><b>{item.glyph}</b>{item.label}</div>)}<div className="connection-core">P</div></div></div></div></section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-slate-600">Polynus - a calmer operating layer for your many realities.</footer>
    </main>
  );
}
