import '@/app/global.css';

import { Header } from '@/app/Header';
import { SideBar } from '@/app/SideBar';
import type { layout_RootLayoutQuery } from '@/app/__generated__/layout_RootLayoutQuery.graphql';
import { RelayEnvironmentProvider } from '@/components/RelayEnvironmentProvider';
import { fetchGraphQLQuery } from '@/lib/relay/fetchQuery';
import type { Metadata } from 'next';
import { graphql } from 'relay-runtime';

import { RelayRecordMapPublisher } from '@/components/RelayRecordMapPublisher';
import styles from './layout.module.css';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

export const metadata: Metadata = {
  title: 'mini-blog',
  description: 'A minimal blog with Next.js and Relay.',
};

const rootLayoutQuery = graphql`
  query layout_RootLayoutQuery @raw_response_type {
    ...SideBar_query
  }
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, recordMap } = await fetchGraphQLQuery<layout_RootLayoutQuery>(rootLayoutQuery, {});
  return (
    <html lang="en">
      <head>{/* TODO: Add favicon */}</head>
      <RelayEnvironmentProvider>
        <RelayRecordMapPublisher recordMap={recordMap}>
          <body>
            <div>
              <Header />
              <div className={styles.columnWrapper}>
                <div className={styles.mainColumn}>{children}</div>
                <div className={styles.rightColumn}>
                  <SideBar query={data} />
                </div>
              </div>
            </div>
          </body>
        </RelayRecordMapPublisher>
      </RelayEnvironmentProvider>
    </html>
  );
}
