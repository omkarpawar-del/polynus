import './globals.css'; import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Polynus | Your AI life, in balance', description: 'A unified AI activity dashboard' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
