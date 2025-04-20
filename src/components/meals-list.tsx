import { useStore } from "@livestore/react";
import { mealUpdated } from "../lib/events";
import {
  convertedMealsQuery$,
  filterFoodsQuery$,
  totalMacrosQuery$,
} from "../lib/queries";
import { events } from "../lib/schema";

export default function MealsList() {
  const { store } = useStore();
  const filterFoods = store.useQuery(filterFoodsQuery$);
  const totalMacros = store.useQuery(totalMacrosQuery$);
  const meals = store.useQuery(convertedMealsQuery$);
  return (
    <div>
      <h4>Meals</h4>
      <div>
        <p>Calories: {totalMacros.calories.toFixed(2)}</p>
        <p>Protein: {totalMacros.protein.toFixed(2)}</p>
        <p>Carbs: {totalMacros.carbs.toFixed(2)}</p>
        <p>Fat: {totalMacros.fat.toFixed(2)}</p>
      </div>
      <input
        type="text"
        placeholder="Filter by food name"
        value={filterFoods.name}
        onChange={(e) => {
          store.commit(events.setFilterFoods({ name: e.target.value }));
        }}
      />
      {meals.map((meal) => (
        <div key={meal.id}>
          <p>{meal.name}</p>
          <input
            type="number"
            value={meal.quantity}
            onChange={(e) => {
              store.commit(
                mealUpdated({ id: meal.id, quantity: e.target.valueAsNumber })
              );
            }}
          />
          <div>
            <span>{meal.calories.toFixed(2)} calories</span>{" "}
            <span>{meal.protein.toFixed(2)} protein</span>{" "}
            <span>{meal.carbs.toFixed(2)} carbs</span>{" "}
            <span>{meal.fat.toFixed(2)} fat</span>
          </div>
        </div>
      ))}
    </div>
  );
}
