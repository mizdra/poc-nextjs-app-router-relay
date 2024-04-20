'use client';

// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { RelayEnvironmentProvider as OriginalRelayEnvironmentProvider } from 'react-relay';
import { getCurrentEnvironment } from '@/lib/relay/environment';

export function RelayEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const environment = getCurrentEnvironment();
  return <OriginalRelayEnvironmentProvider environment={environment}>{children}</OriginalRelayEnvironmentProvider>;
}
