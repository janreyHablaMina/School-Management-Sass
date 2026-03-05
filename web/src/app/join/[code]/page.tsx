import { redirect } from 'next/navigation';
import { loginInvitePath } from '@/lib/classroom';

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
  redirect(loginInvitePath(code ?? '', exp));
}
