'use client';

import { createEnvironment } from '@/lib/relay/environment';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { RelayEnvironmentProvider as OriginalRelayEnvironmentProvider } from 'react-relay';

export function RelayEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const environment = createEnvironment();
  return <OriginalRelayEnvironmentProvider environment={environment}>{children}</OriginalRelayEnvironmentProvider>;
}
