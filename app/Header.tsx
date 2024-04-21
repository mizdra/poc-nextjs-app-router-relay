'use client';

import type { HeaderQuery } from '@/app/__generated__/HeaderQuery.graphql';
import { useEffect } from 'react';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { type PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { graphql } from 'relay-runtime';

import { User } from '@/components/User';
import Link from 'next/link';
import styles from './Header.module.css';

const headerQuery = graphql`
  query HeaderQuery @raw_response_type {
    viewer {
      user {
        ...User_user
      }
    }
  }
`;

export function Header() {
  const [queryReference, loadQuery] = useQueryLoader<HeaderQuery>(headerQuery);
  // Fetch user-specific data on the client side to keep the entire page cacheable on the CDN.
  useEffect(() => {
    loadQuery({});
  }, [loadQuery]);
  return (
    <header className={styles.header}>
      <div>
        <Link className={styles.title} href="/">
          mini-blog
        </Link>
      </div>
      <div>{queryReference ? <LoginButtonOrUser queryReference={queryReference} /> : 'Loading...'}</div>
    </header>
  );
}

function LoginButtonOrUser({ queryReference }: { queryReference: PreloadedQuery<HeaderQuery> }) {
  const { viewer } = usePreloadedQuery(headerQuery, queryReference);
  if (viewer) {
    return (
      <div className={styles.userInfo}>
        <User user={viewer.user} />
      </div>
    );
  }
  return (
    <form action="#">
      <button type="submit">Login</button>
    </form>
  );
}
