'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type Mode = 'professional' | 'academic' | 'personal';
type Card = { mode: Mode; totalSeconds: number; lastActivity: string | null; usage: { provider: string; seconds: number }[]; tasks: { id: string; title: string; source_provider: string }[] };
type Data = { connected: string[]; cards: Card[]; recommendation: string | null };

const modes: Record<Mode, { label: string; color: string; tint: string; dot: string }> = {
  professional: { label: 'Professional', color: '#b38aff', tint: 'from-violet-500/20', dot: 'bg-violet-400' },
  academic: { label: 'Academic', color: '#65d9ad', tint: 'from-emerald-500/20', dot: 'bg-emerald-400' },
  personal: { label: 'Personal', color: '#f5a86e', tint: 'from-amber-500/20', dot: 'bg-amber-400' },
};
const prettyTime = (seconds: number) => seconds >= 3600 ? `${(seconds / 3600).toFixed(seconds % 3600 ? 1 : 0)}h` : seconds ? `${Math.max(1, Math.round(seconds / 60))}m` : '0m';
const greeting = () => { const hour = new Date().getHours(); return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'; };

export default function Dashboard() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const load = () => fetch('/api/dashboard').then(r => r.json()).then(setData);
  useEffect(() => { load(); }, []);
  const sync = async () => { setLoading(true); await fetch('/api/sync', { method: 'POST' }); await load(); setLoading(false); };
  const cards = useMemo(() => (data?.cards ?? []).map(card => ({
    ...card,
    tasks: card.tasks.filter((task, index, list) => list.findIndex(candidate => candidate.title === task.title && candidate.source_provider === task.source_provider) === index),
  })), [data]);
  const priorities = cards.flatMap(card => card.tasks.map(task => ({ ...task, mode: card.mode }))).slice(0, 4);
  const totalTasks = priorities.length;
  const priorityLabel = totalTasks === 1 ? 'priority' : 'priorities';
  const plan = useMemo(() => priorities.slice(0, 3).map((task, index) => ({ ...task, time: ['09:00', '11:30', '16:00'][index] })), [priorities]);

  return <main className="min-h-screen bg-[#090a10]"><nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8"><Link href="/" className="brand-mark">polynus<span>.</span></Link><div className="flex items-center gap-3"><Link href="/connect" className="hidden rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 sm:block">Connections {data && <span className="text-emerald-300">({data.connected.length})</span>}</Link><button onClick={sync} disabled={loading} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-violet-100 disabled:opacity-60">{loading ? 'Refreshing...' : 'Refresh day'}</button></div></nav>

    <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8"><section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1a1630] via-[#10121e] to-[#0c1515] p-7 sm:p-10"><div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-violet-500/20 blur-[90px]"/><p className="eyebrow">DAILY COMMAND CENTER</p><div className="relative mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><h1 className="text-4xl font-medium tracking-[-.05em] text-white sm:text-5xl">{greeting()}.</h1><p className="mt-3 max-w-lg text-base leading-relaxed text-slate-400">{totalTasks ? `You have ${totalTasks} ${priorityLabel} waiting across your modes.` : 'Connect a source or refresh your demo day to surface what matters.'}</p></div><div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4"><p className="text-xs text-slate-500">TODAY&apos;S INTENTION</p><p className="mt-1 text-sm text-slate-200">Protect one focused block before you switch contexts.</p></div></div></section>

      <section className="mt-5 grid gap-3 md:grid-cols-3">{(['professional', 'academic', 'personal'] as Mode[]).map(mode => { const card = cards.find(c => c.mode === mode); const theme = modes[mode]; return <article key={mode} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${theme.tint} to-[#11121c] p-5`}><div className="flex items-center justify-between"><span className={`h-2.5 w-2.5 rounded-full ${theme.dot}`}/><span className="text-xs text-slate-500">{card?.tasks.length ?? 0} tasks</span></div><h2 className="mt-6 text-lg font-medium text-white">{theme.label}</h2><p className="mt-1 text-sm text-slate-400">{prettyTime(card?.totalSeconds ?? 0)} with AI today</p><p className="mt-5 truncate text-sm text-slate-200">{card?.tasks[0]?.title ?? 'Nothing needs your attention yet.'}</p></article>; })}</section>

      <section className="command-grid mt-5"><article className="command-main rounded-3xl border border-white/10 bg-white/[.035] p-6 sm:p-7"><div className="flex items-start justify-between"><div><p className="eyebrow">NEEDS ATTENTION</p><h2 className="mt-2 text-2xl font-medium tracking-[-.04em] text-white">The next right things.</h2></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">Today</span></div><div className="mt-7 divide-y divide-white/10">{priorities.length ? priorities.map(item => { const theme = modes[item.mode]; return <div key={item.id} className="flex gap-4 py-4 first:pt-0"><span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded border border-white/30"/><div className="min-w-0 flex-1"><p className="truncate text-sm text-slate-100">{item.title}</p><p className="mt-1 text-xs" style={{ color: theme.color }}>{theme.label} · from {item.source_provider}</p></div><span className="hidden text-xs text-slate-500 sm:block">Action needed</span></div>; }) : <div className="py-7 text-sm text-slate-500">Your day is clear. Connect a source or refresh the demo to populate priorities.</div>}</div></article>
        <article className="command-side rounded-3xl border border-white/10 bg-[#10111a] p-6"><p className="eyebrow">FOCUS PLAN</p><h2 className="mt-2 text-xl font-medium tracking-[-.04em] text-white">Make room for progress.</h2><div className="mt-6 space-y-5">{plan.length ? plan.map(item => <div key={item.id} className="flex gap-3"><span className="font-mono text-xs text-slate-500">{item.time}</span><div className="min-w-0 border-l border-white/15 pl-3"><p className="truncate text-sm text-slate-200">{item.title}</p><p className="mt-1 text-xs" style={{ color: modes[item.mode].color }}>{modes[item.mode].label}</p></div></div>) : <p className="text-sm leading-relaxed text-slate-500">A focus plan appears when Polynus has tasks to work with.</p>}</div></article></section>

      <section className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-[#11121c] to-emerald-500/10 p-6 sm:p-7"><p className="eyebrow">POLYNUS INSIGHT</p><p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-200">{data?.recommendation ?? 'Your best day starts by choosing one mode to move forward before opening the next.'}</p></section>

      <section className="mt-16"><div className="flex items-end justify-between"><div><p className="eyebrow">MODE DETAIL</p><h2 className="mt-2 text-3xl font-medium tracking-[-.05em] text-white">The context behind your day.</h2></div><p className="hidden text-sm text-slate-500 sm:block">Time and tasks, by mode</p></div><div className="mt-6 grid gap-5 lg:grid-cols-3">{cards.map(card => { const theme = modes[card.mode]; const chart = card.usage.length ? card.usage : [{ provider: 'No activity', seconds: 1 }]; return <article key={card.mode} className="panel p-6"><div className="flex justify-between"><div><p className="text-sm font-medium" style={{ color: theme.color }}>{theme.label}</p><p className="mt-1 text-3xl font-semibold">{prettyTime(card.totalSeconds)}</p><p className="text-xs text-slate-500">AI time today</p></div><div className="h-20 w-20"><ResponsiveContainer><PieChart><Pie data={chart} dataKey="seconds" innerRadius={24} outerRadius={37} paddingAngle={3}>{chart.map((_, index) => <Cell key={index} fill={index === 0 ? theme.color : ['#60a5fa', '#f472b6', '#facc15'][index % 3]} />)}</Pie></PieChart></ResponsiveContainer></div></div><div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">{card.usage.map((usage, index) => <span key={usage.provider}><i className="mr-1 inline-block h-2 w-2 rounded-full" style={{ background: index === 0 ? theme.color : '#60a5fa' }} />{usage.provider} {Math.round(usage.seconds / Math.max(card.totalSeconds, 1) * 100)}%</span>)}</div><div className="mt-6 border-t border-white/10 pt-4"><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Pending tasks</p>{card.tasks.length ? <ul className="space-y-2">{card.tasks.slice(0, 3).map(task => <li key={task.id} className="flex gap-2 text-sm text-slate-200"><span className="mt-1 h-3.5 w-3.5 rounded border border-white/30" />{task.title}</li>)}</ul> : <p className="text-sm text-slate-500">No pending tasks yet.</p>}</div></article>; })}</div></section>
    </div>
  </main>;
}
