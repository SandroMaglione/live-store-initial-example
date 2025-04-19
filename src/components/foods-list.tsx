import { useStore } from "@livestore/react";
import { foodUpdated } from "../lib/events";
import { allFoodsQuery$ } from "../lib/queries";

export default function FoodsList() {
  const { store } = useStore();
  const foods = store.useQuery(allFoodsQuery$);
  return (
    <div>
      <h4>Foods</h4>
      {foods.map((food) => (
        <div key={food.id}>
          <p>{food.name}</p>
          <input
            type="text"
            value={food.name}
            onChange={(e) => {
              store.commit(foodUpdated({ id: food.id, name: e.target.value }));
            }}
          />
          <input
            type="number"
            value={food.calories}
            onChange={(e) => {
              store.commit(
                foodUpdated({ id: food.id, calories: e.target.valueAsNumber })
              );
            }}
          />
          <input
            type="number"
            value={food.protein}
            onChange={(e) => {
              store.commit(
                foodUpdated({ id: food.id, protein: e.target.valueAsNumber })
              );
            }}
          />
          <input
            type="number"
            value={food.carbs}
            onChange={(e) => {
              store.commit(
                foodUpdated({ id: food.id, carbs: e.target.valueAsNumber })
              );
            }}
          />
          <input
            type="number"
            value={food.fat}
            onChange={(e) => {
              store.commit(
                foodUpdated({ id: food.id, fat: e.target.valueAsNumber })
              );
            }}
          />
        </div>
      ))}
    </div>
  );
}
