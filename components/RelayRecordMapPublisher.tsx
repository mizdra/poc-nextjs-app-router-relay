'use client';

import { useEffect } from 'react';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { useRelayEnvironment } from 'react-relay';
import { RecordSource } from 'relay-runtime';
import type { OperationDescriptor, RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

// Publish the records to the store.
// This allows the Client Component to take over the Relay Store state from the Server Component.
export function RelayRecordMapPublisher({
  children,
  recordMap,
  operationDescriptor,
}: {
  children: React.ReactNode;
  /** The record map in the relay store after fetching the query on the Server Component */
  recordMap: RecordMap;
  /** The operation descriptor of the query on the Server Component */
  operationDescriptor: OperationDescriptor;
}) {
  const environment = useRelayEnvironment();
  const store = environment.getStore();
  // When the user navigates back in the browser, this component receives a previously
  // published record map. Publishing it will cause the store to be reverted to
  // its initial state. The previous state of pagination will also be reverted.
  // To avoid this, publish it only when the operation's records is stale or missing.
  if (store.check(operationDescriptor).status !== 'available') {
    // NOTE: Normally, side effects are only allowed in useEffect and event handlers.
    // Therefore, this code may surprise you. However, if you publish the same record map to the Relay Store,
    // the state of the store will be the same. Thus, when this component is re-rendered,
    // you will get the same rendering result. Nothing bad will happen.
    store.publish(new RecordSource(recordMap));
  }

  useEffect(() => {
    // Retain the records from being garbage collected while the component is being mounted.
    const disposable = store.retain(operationDescriptor);
    return () => {
      disposable.dispose();
    };
  }, [store, operationDescriptor]);

  return children;
}
