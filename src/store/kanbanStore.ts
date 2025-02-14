import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KanbanState, Task, DragSource, DragDestination } from '../types/kanban';

const generateId = () => Math.random().toString(36).substr(2, 9);

const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      tasks: {
        'task-1': {
          id: 'task-1',
          title: 'Task 1 Name',
          description: 'This is an example of drag and drop using hello-pangea/dnd',
          createdAt: new Date().toISOString(),
          labels: ['example'],
        },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'To Do',
          taskIds: ['task-1'],
        },
        'column-2': {
          id: 'column-2',
          title: 'In Progress',
          taskIds: [],
        },
        'column-3': {
          id: 'column-3',
          title: 'Done',
          taskIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2', 'column-3'],

      addTask: (columnId, taskData) => {
        const newTask: Task = {
          id: `task-${generateId()}`,
          ...taskData,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          tasks: { ...state.tasks, [newTask.id]: newTask },
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              taskIds: [...state.columns[columnId].taskIds, newTask.id],
            },
          },
        }));
      },

      moveTask: (source: DragSource, destination: DragDestination) => {
        set((state) => {
          const sourceColumn = state.columns[source.droppableId];
          const destColumn = state.columns[destination.droppableId];
          const newTaskIds = Array.from(sourceColumn.taskIds);
          const [removed] = newTaskIds.splice(source.index, 1);
          
          if (source.droppableId === destination.droppableId) {
            newTaskIds.splice(destination.index, 0, removed);
            return {
              columns: {
                ...state.columns,
                [source.droppableId]: {
                  ...sourceColumn,
                  taskIds: newTaskIds,
                },
              },
            };
          }

          const destTaskIds = Array.from(destColumn.taskIds);
          destTaskIds.splice(destination.index, 0, removed);
          
          return {
            columns: {
              ...state.columns,
              [source.droppableId]: {
                ...sourceColumn,
                taskIds: newTaskIds,
              },
              [destination.droppableId]: {
                ...destColumn,
                taskIds: destTaskIds,
              },
            },
          };
        });
      },

      addColumn: (title) => {
        const newColumnId = `column-${generateId()}`;
        set((state) => ({
          columns: {
            ...state.columns,
            [newColumnId]: {
              id: newColumnId,
              title,
              taskIds: [],
            },
          },
          columnOrder: [...state.columnOrder, newColumnId],
        }));
      },

      deleteColumn: (columnId) => {
        set((state) => {
          const { [columnId]: deletedColumn, ...remainingColumns } = state.columns;
          return {
            columns: remainingColumns,
            columnOrder: state.columnOrder.filter((id) => id !== columnId),
          };
        });
      },

      searchTasks: (query) => {
        const state = get();
        const searchLower = query.toLowerCase();
        return Object.values(state.tasks).filter(
          (task) =>
            task.title.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower) ||
            task.labels.some((label) => label.toLowerCase().includes(searchLower))
        );
      },
    }),
    {
      name: 'kanban-storage',
    }
  )
);

export default useKanbanStore;