import React, { useEffect, useState, FC } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useAppDispatch, useAppSelector} from "../redux/redux";
import { deleteTask, fetchTasks, updateTask, changeStatusTask, setSkip, getList, addTask, Task} from "../redux/slicers/tasks.slicer"
import { useParams, useNavigate} from 'react-router-dom';
import { ErrorToaster } from '../components/error-toast';
import { TaskModal } from '../components/task-edit.modal';

export const TaskPage: FC = ()=> {
  const { id: listId} = useParams();
  const [page, setPage] = useState(1); 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [maxPage, setMaxPage] = useState(1);
  const { token } = useAppSelector(state => state.auth);
  const { take, skip, task, total, list} = useAppSelector(state => state.task); 
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    if (!listId){ 
      return;
    }
    if (!token){ 
      navigate("/login");
      return;
    }
    dispatch(fetchTasks({take, skip, token, id: listId}));
    dispatch(getList({id: listId, token})).unwrap()
    setMaxPage(Math.ceil(total / take));
  }, [dispatch, skip, take, token, navigate, total, listId]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token){ 
      navigate("/login");
      return;
    }
    if(!listId){
      return;
    }
    // handle create/update logic here
    if (form.id){ 
      dispatch(updateTask({id: form.id, token, name:form.title, description: form.description, completed: form.completed}))
    } else { 
      dispatch(addTask({name: form.title, token, description: form.description, listId}))
    }
    setOpen(false);
  };
  const handleDelete = (id: string) => { 
    if (!token) return;
    dispatch(deleteTask({id, token}));
  }


  const handleAddClick = () => {
    setEditingId(null)
    setForm({title: "", description: "", completed: false, id: ""})
    setOpen(true);
  }

  const handleEdit = (todo: Task) => {
    setEditingId(todo.id)
    setForm({title: todo.name, description: todo.description, completed: todo.completed, id: todo.id})
    setOpen(true);
  }

  return (
    <>
    <ErrorToaster/>
    <TaskModal
        isOpen={open}
        onClose={() => setOpen(false)}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />
    <div className="min-h-screen w-96 bg-gray-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">{list?.name}</h1>
        <button className=' basis-3xs w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-2' onClick={handleAddClick}>Add Task</button>
        <div className="flex flex-col flex-grow overflow-y-auto space-y-4">
          {task.map((todo) => (
            <div
              key={todo.id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md flex justify-between items-start shadow-sm"
            >
              <div className="flex-1">
                <h2
                  className={`text-lg font-medium ${
                    todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {todo.name}
                </h2>
                <p className="text-sm text-gray-600">{todo.description}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <AiOutlineEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <AiOutlineDelete size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <button
            onClick={() => { 
              if (page > 1) {
                setPage(page - 1);
                dispatch(setSkip((page - 2) * take));
              }
            }}
            disabled={page === 1}
            className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            &laquo; Previous
          </button>
          <span className="text-gray-600">
            Page {page}
          </span>
          <button
            onClick={() => {
              if (page < maxPage){ 
                setPage(page + 1);
                dispatch(setSkip(page * take));
                                    }}}
            disabled={page === maxPage}
            className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </div>
  </>
  );
}

