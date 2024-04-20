'use client';

import type { HeaderQuery } from '@/app/__generated__/HeaderQuery.graphql';
import { GraphQLImage } from '@/components/GraphQLImage';
import { Suspense } from 'react';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>mini-blog</div>
      <div>
        <Suspense fallback={'Loading...'}>
          <LoginButtonOrUserAvatar />
        </Suspense>
      </div>
    </header>
  );
}

function LoginButtonOrUserAvatar() {
  const { viewer } = useLazyLoadQuery<HeaderQuery>(
    graphql`
      query HeaderQuery @raw_response_type {
        viewer {
        user {
          name
          avatar {
            url
            width
            height
          }
        }
      }
      }
    `,
    {},
  );
  if (viewer) {
    return (
      <div className={styles.userInfo}>
        <GraphQLImage className={styles.avatar} src={viewer.user.avatar} alt={viewer.user.name} />
        <span>{viewer.user.name}</span>
      </div>
    );
  }
  return (
    <form action="#">
      <button type="submit">Login</button>
    </form>
  );
}
