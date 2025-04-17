import { Events, Schema } from "@livestore/livestore";

// TODO: `schema` before `events` in docs

export const mealCreated = Events.synced({
  // ?: Why `v1` is necessary? Can this be type safe instead of inside a `string`?
  name: "v1.MealCreated",
  schema: Schema.Struct({ foodId: Schema.String, quantity: Schema.Number }),
});

export const foodCreated = Events.synced({
  name: "v1.FoodCreated",
  // ?: I would avoid adding a public API that is not implemented (`facts`)
  // ?: What if this schema doesn't match the table schema?
  schema: Schema.Struct({
    name: Schema.String,
    calories: Schema.Number,
    protein: Schema.Number,
    carbs: Schema.Number,
    fat: Schema.Number,
  }),
});
