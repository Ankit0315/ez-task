import { useState, useEffect, useRef } from "react";
import type { ColumnType } from "../types/kanban";

interface Props {
  id: string;
  title: string;
  columnId: ColumnType;
  onDelete: () => void;
  onEdit: (value: string) => void;
}

export function Card({ id, title, columnId, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(title);
  }, [title]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (editing) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ cardId: id, columnId })
    );

    setIsDragging(true);
    if (cardRef.current) {
      cardRef.current.style.opacity = "0.5";
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (cardRef.current) {
      cardRef.current.style.opacity = "1";
    }
  };

  const handleSave = () => {
    if (value.trim()) {
      onEdit(value.trim());
    } else {
      setValue(title);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setValue(title);
      setEditing(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      ref={cardRef}
      draggable={!editing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`card card-${columnId} ${isDragging ? "card-dragging" : ""} ${
        editing ? "card-editing" : ""
      }`}
    >
      <div className={`card-left-bar card-left-bar-${columnId}`} />

      <div className="card-body">
        <div className="card-header-row">
          <div
            className="card-title-wrapper"
            onDoubleClick={() => setEditing(true)}
            onDragStart={(e) => e.stopPropagation()}
          >
            {editing ? (
              <input
                className="card-title-input"
                value={value}
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <p
                className="card-title"
                title="Double-click to edit"
                style={{ marginTop: "2px" }}
              >
                {title}
              </p>
            )}
          </div>

          {columnId !== "done" && (
            <button
              className="delete-btn"
              onClick={handleDeleteClick}
              onMouseDown={(e) => e.stopPropagation()}
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 11V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
