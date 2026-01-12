import type { Column } from "../types/kanban";

export const initialColumns: Column[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "1", title: "Create initial project plan" },
      { id: "2", title: "Design landing page" },
      { id: "3", title: "Review codebase structure" }
    ]
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "4", title: "Implement authentication" },
      { id: "5", title: "Set up database schema" },
      { id: "6", title: "Fix navbar bugs" }
    ]
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "7", title: "Organize project repository" },
      { id: "8", title: "Write API documentation" }
    ]
  }
];
