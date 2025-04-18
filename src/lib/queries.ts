import { queryDb } from "@livestore/livestore";
import { tables } from "./schema";

// ?: Why the `$` convention?
export const allFoodsQuery$ = queryDb(tables.foods.select());
