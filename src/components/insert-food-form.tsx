import { useStore } from "@livestore/react";
import { events } from "../lib/schema";

export default function InsertFoodForm() {
  const { store } = useStore();
  const action = (formData: globalThis.FormData) => {
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
  };
  return (
    <form action={action}>
      <input type="text" name="name" placeholder="Name" />
      <input type="number" name="calories" placeholder="Calories" />
      <input type="number" name="protein" placeholder="Protein" />
      <input type="number" name="carbs" placeholder="Carbs" />
      <input type="number" name="fat" placeholder="Fat" />
      <button type="submit">Submit</button>
    </form>
  );
}
