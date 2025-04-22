import { State } from "@livestore/livestore";
import * as events from "./events";
import { meals } from "./tables";

// ?: Why the name `materializers`? What about `actions`?
export const materializers = State.SQLite.materializers(events, {
  "v1.MealCreated": ({ date }) =>
    meals.insert({ id: crypto.randomUUID(), date }),
});
