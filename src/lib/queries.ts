import { computed, queryDb, Schema, signal, sql } from "@livestore/livestore";
import { tables } from "./schema";

export const dateSearchParamSignal$ = signal(
  (() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    const date = searchParams.get("date");
    return date!; // TODO: Not that great
  })()
);

const allMealsWithFoodsQuery$ = queryDb((get) => {
  const date = get(dateSearchParamSignal$);
  console.log("date", date);
  return {
    query: sql`
    SELECT meal.id, meal.date
    FROM meal
    WHERE meal.date = '${date}'
  `,
    schema: Schema.Array(tables.meals.rowSchema),
  };
});

export const convertedMealsQuery$ = computed((get) => {
  const meals = get(allMealsWithFoodsQuery$);
  return meals.map((meal) => ({
    id: meal.id,
    date: meal.date,
  }));
});
