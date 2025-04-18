import { queryDb, Schema, sql } from "@livestore/livestore";
import { tables } from "./schema";

// ?: Why the `$` convention?
export const allFoodsQuery$ = queryDb(tables.foods.select());

export const allMealsWithFoodsQuery$ = queryDb({
  query: sql`
    SELECT meal.id, meal.quantity, food.name
    FROM meal
    LEFT JOIN food ON meal.foodId = food.id
  `,
  schema: tables.meals.rowSchema.pipe(
    Schema.omit("foodId"),
    Schema.extend(tables.foods.rowSchema.pipe(Schema.pick("name"))),
    Schema.Array
  ),
});
