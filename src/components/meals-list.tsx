import { useStore } from "@livestore/react";
import { allMealsWithFoodsQuery$ } from "../lib/queries";

export default function MealsList() {
  const { store } = useStore();
  const meals = store.useQuery(allMealsWithFoodsQuery$);
  return (
    <div>
      <h4>Meals</h4>
      {meals.map((meal) => (
        <div key={meal.id}>
          <p>
            <span>{meal.name}</span> <span>{meal.quantity}</span>
          </p>
          <div>
            <span>
              {(meal.calories * (meal.quantity / 100)).toFixed(2)} calories
            </span>{" "}
            <span>
              {(meal.protein * (meal.quantity / 100)).toFixed(2)} protein
            </span>{" "}
            <span>{(meal.carbs * (meal.quantity / 100)).toFixed(2)} carbs</span>{" "}
            <span>{(meal.fat * (meal.quantity / 100)).toFixed(2)} fat</span>
          </div>
        </div>
      ))}
    </div>
  );
}
