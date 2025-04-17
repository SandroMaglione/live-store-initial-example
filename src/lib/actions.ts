import { makeSchema, State } from "@livestore/livestore";
import * as events from "./events";
import * as tables from "./schema";

// ?: Why the name `materializers`? What about `actions`?
const actions = State.SQLite.materializers(events, {
  "v1.MealCreated": ({ foodId, quantity }) =>
    tables.meals.insert({ id: crypto.randomUUID(), foodId, quantity }),

  "v1.FoodCreated": ({ name, calories, protein, carbs, fat }) =>
    tables.foods.insert({
      id: crypto.randomUUID(),
      name,
      calories,
      protein,
      carbs,
      fat,
    }),
});

const state = State.SQLite.makeState({ tables, materializers: actions });

export const schema = makeSchema({ events, state });
