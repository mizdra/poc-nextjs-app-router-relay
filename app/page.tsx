import { Card } from '@/components/Card';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

export default async function RootPage() {
  return (
    <main>
      <Card>
        <p>Welcome to mini-blog!</p>
        <p>This blog is a PoC for combining Next.js App Router and Relay.</p>
      </Card>
    </main>
  );
}
