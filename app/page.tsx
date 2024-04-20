import { Card } from '@/components/Card';

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
