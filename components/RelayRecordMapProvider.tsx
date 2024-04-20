'use client';

// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { useRelayEnvironment } from 'react-relay';
import { RecordSource } from 'relay-runtime';
import type { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

export function RelayRecordMapProvider({ children, recordMap }: { children: React.ReactNode; recordMap: RecordMap }) {
  const environment = useRelayEnvironment();
  const recordSource = new RecordSource(recordMap);
  environment.getStore().publish(recordSource);
  return children;
}
