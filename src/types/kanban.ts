export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  labels: string[];
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface KanbanState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
  addTask: (columnId: string, task: Omit<Task, 'id' | 'createdAt'>) => void;
  moveTask: (source: DragSource, destination: DragDestination) => void;
  addColumn: (title: string) => void;
  deleteColumn: (columnId: string) => void;
  searchTasks: (query: string) => Task[];
}

export interface DragSource {
  droppableId: string;
  index: number;
}

export interface DragDestination {
  droppableId: string;
  index: number;
}