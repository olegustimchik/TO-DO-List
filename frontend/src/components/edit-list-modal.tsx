import React, { useState } from 'react';
import { updateList, addUser } from '../redux/slicers/lists.slicer';
import { useAppDispatch, useAppSelector} from "../redux/redux";
import { useNavigate } from 'react-router-dom';

interface EditListModalProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  id: string; 
}

export const EditListModal: React.FC<EditListModalProps> = ({ isOpen, onClose, listName, id}) => {
  const [newName, setNewName] = useState(listName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<string>("viewer");
  const { token } = useAppSelector(state => state.auth);
  
  if (!token){ 
      navigate("/login");
      return ;
  }

  if (!isOpen) return null; 

  const handleAddUser = () => {
    if (!userEmail) return;
    dispatch(addUser({email: userEmail, token, id, role: userRole}));
    
  };

  const handleSave = () => {
    dispatch(updateList({id, token, name: newName}))
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Edit List</h2>

        {/* List Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">List Name</label>
          <input
            type="text"
            className="w-full border text-gray-700 border-gray-300 text rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        {/* Add User */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Share With</label>
          <div className="flex gap-2">
            <input
              type="email"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-700  focus:outline-none"
              placeholder="User email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <select
              className="border border-gray-300 rounded px-2 py-2 text-sm text-gray-700 "
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value={"owner"}>owner</option>
              <option value={"admin"}>admin</option>
              <option value={"viewer"}>viewer</option>
            </select>
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-black"
          >
            Cancel
          </button>
        <button
            onClick={() => navigate(`/lists/${id}/tasks`)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tasks
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};


