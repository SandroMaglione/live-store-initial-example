
## Getting started
Install dependencies and add setup `vite.config.js`:

```sh
pnpm add @livestore/livestore @livestore/react @livestore/wa-sqlite @livestore/adapter-web @livestore/peer-deps
```

```js
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isProdBuild = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact()],
  worker: isProdBuild ? { format: "es" } : undefined,
  // TODO: This required config is missing in the quickstart guide
  optimizeDeps: { exclude: ["@livestore/wa-sqlite"] },
});
```

Setup schema and events:
1. Define [tables](./src/lib/tables.ts) (`State.SQLite.table`)
2. Defines [events](./src/lib/events.ts)
3. Define [materializers](./src/lib/materializers.ts): map events to database operations
4. Export [schema](./src/lib/schema.ts) (`makeSchema`)

Create required [worker](./src/worker.ts) passing the [`schema`](./src/lib/schema.ts).

Create an adapter (`makePersistedAdapter`) passing the worker just created. Wrap the app in `LiveStoreProvider`, passing the `schema`, `adapter`, and `unstable_batchedUpdates`.

Implement the app:
- Extract `store` from `useStore` for committing events (`commit`) and reading data (`useQuery`)
- `store.commit` is sync, you call it inside `onChange` passing an [event](./src/lib/events.ts)
- Define [queries](./src/lib/queries.ts) (`queryDb` or `computed`): Queries from [tables](./src/lib/tables.ts) (e.g. `tables.foods.select()`) or raw SQL queries (using `sql` and passing a `schema`). `useQuery` extracts the data (**reactive**)

## Dependencies
1. `@livestore/livestore`: Core dependency (e.g. events, tables, queries)
2. `@livestore/react`: Provider and hooks for React (e.g. `LiveStoreProvider`)
3. `@livestore/adapter-web`: Web adapter `makePersistedAdapter`, workers, and `opfs`
4. `@livestore/peer-deps`: Fixes issues with inconsistent package versions
5. `@livestore/wa-sqlite`: Wasm for SQLite (storage)

Optional:
- `@livestore/common`: Shared types and utils
- `effect` / `@effect/platform`: For implementing a custom sync backend 

***

## Notes

Create `vite` app with TanStack Router.

```sh
pnpm add @livestore/livestore
```

Added worker `{ format: "es" }` to `vite.config.ts`.

`schema`, `events`, `actions` (`materializers`).

```sh
pnpm add @livestore/react
```

Setup entry `_root.tsx` with `LiveStoreProvider` and adapter.

```sh
pnpm add @livestore/adapter-web
```

Got error:

```sh
✘ [ERROR] No matching export in "node_modules/.pnpm/@effect+platform@0.69.31_effect@3.14.10/node_modules/@effect/platform/dist/esm/WorkerRunner.js" for import "launch"
```

Fixed by installing `@livestore/peer-deps`:

```sh
pnpm add @livestore/peer-deps
```

> Got this error when launching the app with the current configuration:
> ```sh
> LiveStore.UnexpectedError: { "cause": RuntimeError: Aborted(CompileError: WebAssembly.instantiate(): expected magic word 00 61 73 6d, found 3c 21 64 6f @+0). Build with -sASSERTIONS for more info., "note": undefined, "payload": undefined }
>

Fixed by adding `optimizeDeps: { exclude: ["@livestore/wa-sqlite"] }` to `vite.config.js` as well as installing `@livestore/wa-sqlite`:

```sh
pnpm add @livestore/wa-sqlite
```

**Completed minimal working setup!**

