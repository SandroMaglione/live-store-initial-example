import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import { LiveStoreProvider } from "@livestore/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { unstable_batchedUpdates as batchUpdates } from "react-dom";
import { schema } from "../lib/schema";
import LiveStoreWorker from "../worker?worker";

// TODO: The following command resets the database `await (await navigator.storage.getDirectory()).remove({ recursive: true });`

const adapter = makePersistedAdapter({
  storage: { type: "opfs" },
  sharedWorker: LiveStoreSharedWorker,
  worker: LiveStoreWorker,
});

export const Route = createRootRoute({
  component: () => {
    return (
      <LiveStoreProvider
        schema={schema}
        adapter={adapter}
        batchUpdates={batchUpdates}
        renderLoading={({ stage }) => <p>{stage}</p>}
      >
        <Outlet />
      </LiveStoreProvider>
    );
  },
});
