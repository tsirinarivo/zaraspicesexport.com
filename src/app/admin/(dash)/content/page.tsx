import { getContent } from '@/lib/store';
import ContentEditor from '@/components/admin/ContentEditor';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const content = await getContent();
  return <ContentEditor initialContent={content} />;
}
