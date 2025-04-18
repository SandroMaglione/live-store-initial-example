import { makeSchema, State } from "@livestore/livestore";
import * as events from "./events";
import { materializers } from "./materializers";
import * as tables from "./tables";

const state = State.SQLite.makeState({ tables, materializers });

export { events, tables };
export const schema = makeSchema({ events, state });
