import { makeWorker } from "@livestore/adapter-web/worker";
import { schema } from "./lib/schema";

makeWorker({ schema });
