'use client';

import { createEnvironment } from '@/lib/relay/environment';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { RelayEnvironmentProvider as OriginalRelayEnvironmentProvider } from 'react-relay';

// Original `RelayEnvironmentProvider` calls `createContext` but is not marked with 'use client'.
// Therefore, wrap it and mark the wrapped one with 'use client'.
export function RelayEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const environment = createEnvironment();
  return <OriginalRelayEnvironmentProvider environment={environment}>{children}</OriginalRelayEnvironmentProvider>;
}
