import { useStore } from "@livestore/react";
import { useActionState } from "react";
import { allFoodsQuery$ } from "../lib/queries";
import { events } from "../lib/schema";

export default function InsertMealForm() {
  const { store } = useStore();
  const foods = store.useQuery(allFoodsQuery$);
  const [_, action] = useActionState(
    (_: unknown, formData: globalThis.FormData) => {
      const foodId = formData.get("foodId");
      const quantity = formData.get("quantity");
      store.commit(
        events.mealCreated({
          foodId: foodId as string,
          quantity: Number(quantity),
        })
      );
    },
    null
  );
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
