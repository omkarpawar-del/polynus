import Link from 'next/link';
import AuthButton from '@/components/auth-button';

const modes = [
  ['Professional', 'Client work, meetings, and execution.', 'bg-violet-500'],
  ['Academic', 'Learning, research, and assignments.', 'bg-emerald-500'],
  ['Personal', 'Projects and life outside the day job.', 'bg-orange-400'],
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[.25em] text-violet-300">
          Polynus
        </Link>
        <Link href="/connect" className="text-sm text-slate-300 hover:text-white">
          Sign in
        </Link>
      </nav>

      <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 text-center sm:px-8 sm:pt-28">
        <div className="absolute left-1/2 top-4 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-[110px]" />
        <p className="text-sm font-medium text-violet-300">ONE PLACE FOR YOUR AI WORK</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
          Your AI life,
          <br />
          <span className="text-violet-300">in balance.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-slate-400">
          Polynus turns AI conversations into clear priorities - so work, learning,
          and life stop competing for your attention.
        </p>

        <div className="mt-9 flex justify-center gap-3">
          <AuthButton label="Start for free" />
          <a href="#how-it-works" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium hover:bg-white/10">
            See how it works
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-24 sm:grid-cols-3 sm:px-8">
        {modes.map(([name, copy, color]) => (
          <article key={name} className="panel p-6">
            <span className={`inline-block h-3 w-3 rounded-full ${color}`} />
            <h2 className="mt-7 text-xl font-semibold">{name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{copy}</p>
          </article>
        ))}
      </section>

      <section id="how-it-works" className="border-y border-white/10 bg-white/[.025]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <p className="text-center text-sm font-medium text-violet-300">HOW IT WORKS</p>
          <div className="mt-10 grid gap-8 text-center sm:grid-cols-3">
            {[
              ['1', 'Connect', 'Sign in securely and connect the sources you choose.'],
              ['2', 'Understand', 'Polynus identifies tasks, activity, and work mode.'],
              ['3', 'Focus', 'See what matters now and move forward with clarity.'],
            ].map(([number, title, description]) => (
              <div key={number}>
                <span className="text-4xl font-semibold text-violet-300">{number}</span>
                <h3 className="mt-3 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="text-3xl font-semibold">Make every AI conversation count.</h2>
        <p className="mt-3 text-slate-400">A calmer, more intentional way to work with AI.</p>
        <div className="mt-7">
          <AuthButton label="Create your workspace" />
        </div>
      </section>
    </main>
  );
}
