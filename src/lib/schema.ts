import { makeSchema, State } from "@livestore/livestore";
import * as sqlEvents from "./events";
import { materializers } from "./materializers";
import * as sqlTables from "./tables";

const events = { ...sqlEvents };
const tables = { ...sqlTables };

const state = State.SQLite.makeState({ tables, materializers });

export { events, tables };
export const schema = makeSchema({ events, state });
