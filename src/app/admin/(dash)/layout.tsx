import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthed())) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-[#060e1c] text-[var(--text-primary)]">
      <AdminSidebar />
      <main className="ml-60 min-h-screen">{children}</main>
    </div>
  );
}
