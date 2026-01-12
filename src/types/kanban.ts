export type ColumnType = "todo" | "in-progress" | "done";

export interface Card {
  id: string;
  title: string;
}

export interface Column {
  id: ColumnType;
  title: string;
  cards: Card[];
}
