import { computed, queryDb, Schema, sql } from "@livestore/livestore";
import { Number } from "effect";
import { tables } from "./schema";

// ?: Why the `$` convention?
export const allFoodsQuery$ = queryDb(tables.foods.select());

export const filterFoodsQuery$ = queryDb(tables.filterFoodsDocument.get());

export const allMealsWithFoodsQuery$ = queryDb((get) => {
  const { name } = get(filterFoodsQuery$);
  return {
    query: sql`
    SELECT meal.id, meal.quantity, food.name, food.calories, food.protein, food.carbs, food.fat
    FROM meal
    INNER JOIN food ON meal.foodId = food.id
    ${name ? `WHERE food.name LIKE '%${name}%'` : ``}
  `,
    schema: tables.meals.rowSchema.pipe(
      Schema.omit("foodId"),
      Schema.extend(
        tables.foods.rowSchema.pipe(
          Schema.pick("name", "calories", "protein", "carbs", "fat")
        )
      ),
      Schema.Array
    ),
  };
});

export const totalMacrosQuery$ = computed((get) => {
  const meals = get(allMealsWithFoodsQuery$);
  return {
    calories: Number.sumAll(
      meals.map((meal) => meal.calories * (meal.quantity / 100))
    ).toFixed(2),
    protein: Number.sumAll(
      meals.map((meal) => meal.protein * (meal.quantity / 100))
    ).toFixed(2),
    carbs: Number.sumAll(
      meals.map((meal) => meal.carbs * (meal.quantity / 100))
    ).toFixed(2),
    fat: Number.sumAll(
      meals.map((meal) => meal.fat * (meal.quantity / 100))
    ).toFixed(2),
  };
});
