export type Mode = 'professional' | 'academic' | 'personal';
export type Provider = 'openai' | 'gemini' | 'claude';
export type Task = { id:string; title:string; mode:Mode; status:'pending'|'done'; source_provider:Provider; created_at:string };
export type Usage = { mode:Mode; provider:Provider; seconds:number; last_activity_at:string };
