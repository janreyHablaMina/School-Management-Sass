import { redirect } from 'next/navigation';

interface JoinRedirectPageProps {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ exp?: string }>;
}

/** Legacy invite URLs redirect to login with the join code. */
export default async function JoinRedirectPage({
  params,
  searchParams,
}: JoinRedirectPageProps) {
  const { code } = await params;
  const { exp } = await searchParams;
  const query = new URLSearchParams();
  if (code) query.set('code', decodeURIComponent(code).trim().toUpperCase());
  if (exp) query.set('exp', exp);
  const qs = query.toString();
  redirect(qs ? `/login?${qs}` : '/login');
}
