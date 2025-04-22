import { Events, Schema } from "@livestore/livestore";

export const mealCreated = Events.synced({
  name: "v1.MealCreated",
  schema: Schema.Struct({ date: Schema.String }),
});
