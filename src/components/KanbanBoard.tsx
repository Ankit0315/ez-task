import { useState } from "react";
import type {
  Column as ColumnType,
  ColumnType as ColumnTypeId,
} from "../types/kanban";
import { initialColumns } from "../data/initialData";
import { Column } from "./Column";

export function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);

  const handleCardMove = (
    cardId: string,
    fromColumnId: ColumnTypeId,
    toColumnId: ColumnTypeId
  ) => {
    if (fromColumnId === toColumnId) {
      return;
    }

    const fromColumn = columns.find((col) => col.id === fromColumnId);
    const toColumn = columns.find((col) => col.id === toColumnId);

    if (!fromColumn || !toColumn) return;

    const card = fromColumn.cards.find((c) => c.id === cardId);
    if (!card) return;

    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id === fromColumnId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        if (col.id === toColumnId) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      })
    );
  };

  const handleAddCard = (columnId: ColumnTypeId) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                {
                  id: crypto.randomUUID(),
                  title: "New Card",
                },
              ],
            }
          : col
      )
    );
  };

  const handleDeleteCard = (columnId: ColumnTypeId, cardId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  };

  const handleEditCard = (
    columnId: ColumnTypeId,
    cardId: string,
    value: string
  ) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === cardId ? { ...card, title: value } : card
              ),
            }
          : col
      )
    );
  };

  return (
    <div className="board">
      {columns.map((col) => (
        <Column
          key={col.id}
          columnId={col.id}
          title={col.title}
          cards={col.cards}
          onAdd={() => handleAddCard(col.id)}
          onDelete={(id) => handleDeleteCard(col.id, id)}
          onEdit={(id, value) => handleEditCard(col.id, id, value)}
          onCardMove={handleCardMove}
        />
      ))}
    </div>
  );
}
