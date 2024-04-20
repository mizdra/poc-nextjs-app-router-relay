import { Card } from '@/components/Card';
import Link from 'next/link';
import { graphql, readInlineData } from 'relay-runtime';

import { LatestArticleCard } from '@/app/SideBar/LatestArticleCard';
import type { SideBar_query$key } from '@/app/SideBar/__generated__/SideBar_query.graphql';
import styles from './index.module.css';

export function SideBar({ query: _query }: { query: SideBar_query$key }) {
  const {
    popularArticles: { nodes: popularArticles },
    ...query
  } = readInlineData(
    graphql`
    fragment SideBar_query on Query @inline {
      popularArticles(first: 3) {
        nodes {
          id
          title
        }
      }
      ...LatestArticleCard_query
    }
  `,
    _query,
  );
  return (
    <div className={styles.container}>
      <LatestArticleCard query={query} />
      <Card>
        <h2>Popular Articles</h2>
        <ul>
          {popularArticles.map((article) => (
            <li key={article.id}>
              <Link href={`/article/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
