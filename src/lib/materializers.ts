import { State } from "@livestore/livestore";
import * as events from "./events";
import { foods, meals } from "./tables";

// ?: Why the name `materializers`? What about `actions`?
export const materializers = State.SQLite.materializers(events, {
  "v1.MealCreated": ({ foodId, quantity }) =>
    meals.insert({ id: crypto.randomUUID(), foodId, quantity }),

  "v1.FoodCreated": ({ name, calories, protein, carbs, fat }) =>
    foods.insert({
      id: crypto.randomUUID(),
      name,
      calories,
      protein,
      carbs,
      fat,
    }),
});
