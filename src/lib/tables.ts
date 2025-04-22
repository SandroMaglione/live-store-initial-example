import { State } from "@livestore/livestore";

export const meals = State.SQLite.table({
  name: "meal",
  columns: {
    id: State.SQLite.text({ primaryKey: true }),
    date: State.SQLite.text(),
  },
});
