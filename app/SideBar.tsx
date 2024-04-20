import type { SideBar_query$key } from '@/app/__generated__/SideBar_query.graphql';
import { Card } from '@/components/Card';
import Link from 'next/link';
import { graphql, readInlineData } from 'relay-runtime';

export function SideBar({ query }: { query: SideBar_query$key }) {
  const {
    latestArticles: { nodes: latestArticles },
  } = readInlineData(
    graphql`
    fragment SideBar_query on Query @inline {
      latestArticles(first: 5) {
        nodes {
          id
          title
        }
      }
    }
  `,
    query,
  );
  return (
    <div>
      <Card>
        <h2>Latest Articles</h2>
        <ul>
          {latestArticles.map((article) => (
            <li key={article.id}>
              <Link href={`/article/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
