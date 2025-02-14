import React, { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Column } from "./components/Column";
import { AddTaskForm } from "./components/AddTaskForm";
import useKanbanStore from "./store/kanbanStore";

function App() {
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const {
    tasks,
    columns,
    columnOrder,
    moveTask,
    addTask,
    addColumn,
    deleteColumn,
  } = useKanbanStore();

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(source, destination);
  };

  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle.trim());
      setNewColumnTitle("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Kanban Board</h1>
          <div className="flex gap-4">
            <form onSubmit={handleAddColumn} className="flex gap-2">
              <input
                type="text"
                placeholder="New column title"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Column
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="board" type="column" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex overflow-x-auto pb-4"
                >
                  {columnOrder.map((columnId, index) => {
                    const column = columns[columnId];
                    const columnTasks = column.taskIds.map(
                      (taskId) => tasks[taskId]
                    );

                    return (
                      <div key={column.id} className="flex flex-col">
                        <Column
                          column={column}
                          tasks={columnTasks}
                          index={index}
                          onDelete={deleteColumn}
                        />
                        <div className="mt-4">
                          <AddTaskForm
                            onSubmit={(taskData) =>
                              addTask(column.id, taskData)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
