import React from 'react';

interface TaskForm {
    id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: TaskForm;
  setForm: (form: TaskForm) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editingId?: string | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  form,
  setForm,
  handleSubmit,
  editingId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          {editingId ? 'Edit Task' : 'New Task'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full border border-gray-300 text-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full border border-gray-300 text-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.completed}
              onChange={(e) =>
                setForm({ ...form, completed: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">Completed</label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          >
            {editingId ? 'Update' : 'Add'} Todo
          </button>
        </form>
      </div>
    </div>
  );
};

