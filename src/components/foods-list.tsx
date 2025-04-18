import { useStore } from "@livestore/react";
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
          <div>
            <span>{food.calories} calories</span>{" "}
            <span>{food.protein} protein</span> <span>{food.carbs} carbs</span>{" "}
            <span>{food.fat} fat</span>
          </div>
        </div>
      ))}
    </div>
  );
}
