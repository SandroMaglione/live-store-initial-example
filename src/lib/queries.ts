import { computed, queryDb, Schema, signal, sql } from "@livestore/livestore";
import { Number } from "effect";
import { tables } from "./schema";
import { convertMacroQuantity } from "./utils";

// ?: Why the `$` convention?
export const allFoodsQuery$ = queryDb(tables.foods.select());

export const filterFoodsQuery$ = queryDb(tables.filterFoodsDocument.get());

export const dateSearchParamSignal$ = signal(
  (() => {
    const searchParams = new URLSearchParams(window.location.search);
    const date = searchParams.get("date");
    return date!; // TODO: Not that great
  })()
);

const allMealsWithFoodsQuery$ = queryDb((get) => {
  const date = get(dateSearchParamSignal$);
  const { name } = get(filterFoodsQuery$);
  return {
    query: sql`
    SELECT meal.id, meal.date, meal.quantity, food.name, food.calories, food.protein, food.carbs, food.fat
    FROM meal
    INNER JOIN food ON meal.foodId = food.id
    WHERE meal.date = '${date}'
    ${name ? `AND food.name LIKE '%${name}%'` : ``}
  `,
    schema: Schema.Array(
      tables.meals.rowSchema.pipe(
        Schema.omit("foodId"),
        Schema.extend(
          tables.foods.rowSchema.pipe(
            Schema.pick("name", "calories", "protein", "carbs", "fat")
          )
        )
      )
    ),
  };
});

export const convertedMealsQuery$ = computed((get) => {
  const meals = get(allMealsWithFoodsQuery$);
  return meals.map((meal) => ({
    id: meal.id,
    name: meal.name,
    quantity: meal.quantity,
    date: meal.date,
    calories: convertMacroQuantity({
      quantity: meal.quantity,
      macro: meal.calories,
    }),
    protein: convertMacroQuantity({
      quantity: meal.quantity,
      macro: meal.protein,
    }),
    carbs: convertMacroQuantity({
      quantity: meal.quantity,
      macro: meal.carbs,
    }),
    fat: convertMacroQuantity({
      quantity: meal.quantity,
      macro: meal.fat,
    }),
  }));
});

export const totalMacrosQuery$ = computed((get) => {
  const meals = get(convertedMealsQuery$);
  return {
    calories: Number.sumAll(meals.map((meal) => meal.calories)),
    protein: Number.sumAll(meals.map((meal) => meal.protein)),
    carbs: Number.sumAll(meals.map((meal) => meal.carbs)),
    fat: Number.sumAll(meals.map((meal) => meal.fat)),
  };
});
