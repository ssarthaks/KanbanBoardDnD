import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Task } from "./Task";
import { Column as ColumnType, Task as TaskType } from "../types/kanban";
import { Trash2 } from "lucide-react";

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  index: number;
  onDelete: (columnId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  index,
  onDelete,
}) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="bg-gray-100 rounded-lg p-4 w-80 flex flex-col mr-14"
        >
          <div
            {...provided.dragHandleProps}
            className="flex justify-between items-center mb-4"
          >
            <h2 className="text-lg font-semibold">{column.title}</h2>
            <button
              onClick={() => onDelete(column.id)}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Delete column"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-grow min-h-[100px] transition-colors ${
                  snapshot.isDraggingOver ? "bg-gray-200" : ""
                }`}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
