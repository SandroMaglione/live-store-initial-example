import { useStore } from "@livestore/react";
import { useSearch } from "@tanstack/react-router";
import { allFoodsQuery$ } from "../lib/queries";
import { events } from "../lib/schema";

export default function InsertMealForm() {
  const { date } = useSearch({ from: "/" });
  const { store } = useStore();

  const foods = store.useQuery(allFoodsQuery$);
  const action = (formData: globalThis.FormData) => {
    const foodId = formData.get("foodId");
    const quantity = formData.get("quantity");
    store.commit(
      events.mealCreated({
        date,
        foodId: foodId as string,
        quantity: Number(quantity),
      })
    );
  };

  return (
    <form action={action}>
      <input type="number" name="quantity" placeholder="Quantity" />
      <div>
        {foods.map((food) => (
          <label key={food.id}>
            <input type="radio" name="foodId" value={food.id} />
            {food.name}
          </label>
        ))}
      </div>
      <button type="submit">Add</button>
    </form>
  );
}
