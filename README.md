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