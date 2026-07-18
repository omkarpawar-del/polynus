'use client';

import { createClient } from '@/lib/supabase/client';

export default function AuthButton({ label = 'Get started' }: { label?: string }) {
  const signIn = async () => {
    await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    });
  };

  return (
    <button
      onClick={signIn}
      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-100"
    >
      {label}
    </button>
  );
}
