import React, { useState } from "react";

interface AddTaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    labels: string[];
  }) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [labels, setLabels] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, labels });
    setTitle("");
    setDescription("");
    setLabels([]);
    setIsOpen(false);
  };

  const addLabel = () => {
    if (labelInput.trim() && !labels.includes(labelInput.trim())) {
      setLabels([...labels, labelInput.trim()]);
      setLabelInput("");
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
      >
        Add Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Add New Task</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        ></button>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 mb-3 border rounded"
        rows={3}
      />

      <div className="mb-3">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
            placeholder="Add label"
            className="flex-grow p-2 border rounded"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addLabel())
            }
          />
          <button
            type="button"
            onClick={addLabel}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <span
              key={label}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {label}
              <button
                type="button"
                onClick={() => setLabels(labels.filter((l) => l !== label))}
                className="text-blue-600 hover:text-blue-800"
              ></button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Task
      </button>
    </form>
  );
};
