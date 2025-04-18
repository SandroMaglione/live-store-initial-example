import { useStore } from "@livestore/react";
import { createFileRoute } from "@tanstack/react-router";
import { useActionState } from "react";
import { allFoodsQuery$ } from "../lib/queries";
import { events } from "../lib/schema";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { store } = useStore();
  const foods = store.useQuery(allFoodsQuery$);
  const [_, action] = useActionState(
    (_: unknown, formData: globalThis.FormData) => {
      const name = formData.get("name");
      const calories = formData.get("calories");
      const protein = formData.get("protein");
      const carbs = formData.get("carbs");
      const fat = formData.get("fat");
      store.commit(
        events.foodCreated({
          name: name as string,
          calories: Number(calories),
          protein: Number(protein),
          carbs: Number(carbs),
          fat: Number(fat),
        })
      );
    },
    null
  );
  return (
    <div>
      <form action={action}>
        <input type="text" name="name" />
        <input type="number" name="calories" />
        <input type="number" name="protein" />
        <input type="number" name="carbs" />
        <input type="number" name="fat" />
        <button type="submit">Submit</button>
      </form>

      <div>
        {foods.map((food) => (
          <div key={food.id}>
            <h2>{food.name}</h2>
            <p>{food.calories}</p>
            <p>{food.protein}</p>
            <p>{food.carbs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
