'use client';

// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { useRelayEnvironment } from 'react-relay';
import { RecordSource } from 'relay-runtime';
import type { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

const publishedRecordMaps = new WeakSet<RecordMap>();

// Publish the records to the store.
// This allows the Client Component to take over the Relay Store state from the Server Component.
export function RelayRecordMapPublisher({
  children,
  recordMap,
}: {
  children: React.ReactNode;
  /** The record map in the relay store after fetching the query on the Server Component */
  recordMap: RecordMap;
}) {
  const environment = useRelayEnvironment();
  // When the user navigates back in the browser, this component receives a previously
  // published record map. Publishing it will cause the store to be reverted to
  // its initial state. The previous state of pagination will also be reverted.
  // To avoid this, prevent publishing a previously published record map.
  if (!publishedRecordMaps.has(recordMap)) {
    // NOTE: Normally, side effects are only allowed in useEffect and event handlers.
    // Therefore, this code may surprise you. However, if you publish the same record map to the Relay Store,
    // the state of the store will be the same. Thus, when this component is re-rendered,
    // you will get the same rendering result. Nothing bad will happen.
    environment.getStore().publish(new RecordSource(recordMap));
    publishedRecordMaps.add(recordMap);
  }

  return children;
}
