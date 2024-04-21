'use client';

import { useCallback } from 'react';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { useRelayEnvironment } from 'react-relay';

// The component used to run the garbage collector of the Relay store.
// This is for debugging.
export function RelayGCButton() {
  const environment = useRelayEnvironment();
  const handleClick = useCallback(() => {
    console.log('Running GC');
    // biome-ignore lint/suspicious/noExplicitAny: Use internal API.
    (environment.getStore() as any).scheduleGC();
  }, [environment]);
  return (
    <div>
      <button type="button" onClick={handleClick}>
        Run GC for Relay store
      </button>
    </div>
  );
}
