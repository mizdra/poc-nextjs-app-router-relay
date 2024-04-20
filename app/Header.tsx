'use client';

import type { HeaderQuery } from '@/app/__generated__/HeaderQuery.graphql';
import { Suspense } from 'react';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { User } from '@/components/User';
import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link className={styles.title} href="/">
          mini-blog
        </Link>
      </div>
      <div>
        <Suspense fallback={'Loading...'}>
          <LoginButtonOrUser />
        </Suspense>
      </div>
    </header>
  );
}

function LoginButtonOrUser() {
  // Fetch user-specific data on the client side to keep the entire page cacheable on the CDN.
  const { viewer } = useLazyLoadQuery<HeaderQuery>(
    graphql`
      query HeaderQuery @raw_response_type {
        viewer {
        user {
          ...User_user
        }
      }
      }
    `,
    {},
  );
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
