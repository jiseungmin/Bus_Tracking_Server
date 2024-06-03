// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const user = useAuth();
  const router = useRouter();

  if (router.pathname === '/login') {
    return <Component {...pageProps} />;
  }

  if (user === null) {
    return <p>Loading...</p>;
  }

  return <Component {...pageProps} />;
}
