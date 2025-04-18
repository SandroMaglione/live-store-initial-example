import { useStore } from "@livestore/react";
import { allMealsWithFoodsQuery$ } from "../lib/queries";

export default function MealsList() {
  const { store } = useStore();
  const meals = store.useQuery(allMealsWithFoodsQuery$);
  return (
    <ul>
      {meals.map((meal) => (
        <li key={meal.id}>
          {meal.quantity} {meal.name}
        </li>
      ))}
    </ul>
  );
}
