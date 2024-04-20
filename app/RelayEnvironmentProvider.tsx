'use client';

import { getCurrentEnvironment } from '@/lib/relay/environment';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { RelayEnvironmentProvider as OriginalRelayEnvironmentProvider } from 'react-relay';

export function RelayEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const environment = getCurrentEnvironment();
  return <OriginalRelayEnvironmentProvider environment={environment}>{children}</OriginalRelayEnvironmentProvider>;
}
