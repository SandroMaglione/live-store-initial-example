import { useStore } from "@livestore/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DateTime, Effect, Schema } from "effect";
import { useEffect } from "react";
import { convertedMealsQuery$, dateSearchParamSignal$ } from "../lib/queries";
import { events } from "../lib/schema";

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: (params) =>
    Effect.runSync(
      Schema.decodeUnknown(Schema.Struct({ date: Schema.DateTimeUtc }))(
        params
      ).pipe(
        Effect.orElse(() =>
          DateTime.now.pipe(Effect.map((date) => ({ date })))
        ),
        Effect.map((params) => ({
          date: DateTime.formatIsoDateUtc(params.date),
        }))
      )
    ),
});

function App() {
  const { date } = Route.useSearch();
  const { store } = useStore();
  const meals = store.useQuery(convertedMealsQuery$);

  useEffect(() => {
    console.log("setting date", date);
    store.setSignal(dateSearchParamSignal$, date);
  }, [date]);

  return (
    <div>
      <div>
        <Link
          to="."
          search={() => ({
            date: DateTime.formatIsoDateUtc(
              DateTime.subtract(DateTime.unsafeFromDate(new Date(date)), {
                days: 1,
              })
            ),
          })}
        >
          Prev
        </Link>
        <p>{date}</p>
        <Link
          to="."
          search={() => ({
            date: DateTime.formatIsoDateUtc(
              DateTime.add(DateTime.unsafeFromDate(new Date(date)), {
                days: 1,
              })
            ),
          })}
        >
          Next
        </Link>
      </div>

      <button
        type="button"
        onClick={() => store.commit(events.mealCreated({ date }))}
      >
        Insert meal
      </button>

      <div>
        <h4>Meals</h4>
        {meals.map((meal) => (
          <div key={meal.id}>
            <p>{meal.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
