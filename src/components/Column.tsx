import { useState } from "react";
import type { Card as CardType, ColumnType } from "../types/kanban";
import { Card } from "./Card";

interface Props {
  columnId: ColumnType;
  title: string;
  cards: CardType[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, value: string) => void;
  onCardMove?: (
    cardId: string,
    fromColumn: ColumnType,
    toColumn: ColumnType
  ) => void;
}

export function Column({
  columnId,
  title,
  cards,
  onAdd,
  onDelete,
  onEdit,
  onCardMove,
}: Props) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);

    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    const { cardId, columnId: fromColumnId } = data;
    if (cardId && fromColumnId && onCardMove) {
      onCardMove(cardId, fromColumnId as ColumnType, columnId);
    }
  };

  return (
    <div
      className={`column ${isOver ? "column-drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className={`column-header ${title.toLowerCase().replace(" ", "-")}`}>
        <span>
          {title}
          <span className="count">{cards.length}</span>
        </span>
        <button className="icon-btn" onClick={onAdd} aria-label="Add card">
          +
        </button>
      </h2>

      <div className="add-card-wrapper">
        <button className="add-card" onClick={onAdd}>
          + Add Card
        </button>
      </div>

      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            columnId={columnId}
            onDelete={() => onDelete(card.id)}
            onEdit={(value) => onEdit(card.id, value)}
          />
        ))}
      </div>
    </div>
  );
}
