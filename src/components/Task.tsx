import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task as TaskType } from '../types/kanban';
import { Clock, Tag } from 'lucide-react';

interface TaskProps {
  task: TaskType;
  index: number;
}

export const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 mb-2 rounded-lg shadow-sm ${
            snapshot.isDragging ? 'shadow-lg' : ''
          } transition-shadow`}
        >
          <h3 className="font-medium mb-2">{task.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {new Date(task.createdAt).toLocaleDateString()}
            </div>
            <div className="flex flex-wrap gap-1">
              {task.labels.map((label) => (
                <span
                  key={label}
                  className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  <Tag size={12} className="mr-1" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};