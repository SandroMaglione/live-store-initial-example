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

***