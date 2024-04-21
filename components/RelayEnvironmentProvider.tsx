'use client';

import { createEnvironment } from '@/lib/relay/environment';
import { useMemo } from 'react';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { RelayEnvironmentProvider as OriginalRelayEnvironmentProvider } from 'react-relay';

// Original `RelayEnvironmentProvider` calls `createContext` but is not marked with 'use client'.
// Therefore, wrap it and mark the wrapped one with 'use client'.
export function RelayEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const environment = useMemo(() => createEnvironment(), []);
  return <OriginalRelayEnvironmentProvider environment={environment}>{children}</OriginalRelayEnvironmentProvider>;
}
