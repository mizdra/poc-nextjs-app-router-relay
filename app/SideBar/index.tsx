import { Card } from '@/components/Card';
import Link from 'next/link';
import { graphql, readInlineData } from 'relay-runtime';

import { PopularArticleCard } from '@/app/SideBar/PopularArticleCard';
import type { SideBar_query$key } from '@/app/SideBar/__generated__/SideBar_query.graphql';
import styles from './index.module.css';

export function SideBar({ query: _query }: { query: SideBar_query$key }) {
  const {
    latestArticles: { nodes: latestArticles },
    ...query
  } = readInlineData(
    graphql`
    fragment SideBar_query on Query @inline {
      latestArticles(first: 5) {
        nodes {
          id
          title
        }
      }
      ...PopularArticleCard_query
    }
  `,
    _query,
  );
  return (
    <div className={styles.container}>
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
      <PopularArticleCard query={query} />
    </div>
  );
}
