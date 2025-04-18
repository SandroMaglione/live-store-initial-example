import { createFileRoute } from "@tanstack/react-router";
import FoodsList from "../components/foods-list";
import InsertFoodForm from "../components/insert-food-form";
import InsertMealForm from "../components/insert-meal-form";
import MealsList from "../components/meals-list";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <InsertFoodForm />

      <hr />

      <InsertMealForm />

      <hr />

      <FoodsList />

      <hr />

      <MealsList />
    </div>
  );
}
