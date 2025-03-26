import React from "react";
import { FC, useState} from "react";
import { MdEdit, MdDelete} from "react-icons/md";
import { useAppSelector, useAppDispatch } from "../redux/redux";
import { deleteList } from "../redux/slicers/lists.slicer";
import { EditListModal } from "./edit-list-modal";


type ListItemProps = { id: string, name: string, role: string};
export const ListItem: FC<ListItemProps> = ({id, name, role }) => {
      const dispatch = useAppDispatch();
      const [listName, setListName] = useState<string>(name);
      const [isOpen, setOpen] = useState<boolean>(false);
      const { token } = useAppSelector(state => state.auth);
      const handleDelete = (id: string) => {
        if (!token) return;
        dispatch(deleteList({id, token}));
      }

    return (
      <>
      <EditListModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        listName={listName}
        id={id}
      />
      <div key={id} className="basic-1 h-20 w-full p-5 justify-center items-center border border-gray-100 bg-white-500 text-gray-700 rounded-lg hover:border-blue-500 ">
          <div className="flex flex-row gap-2 items-center justify-between">
              <h2 className="text-center">{name}</h2>
              <div className="todo-actions items-center flex flex-row gap-2">
                  <button
                    disabled={role !== "owner" && role !== "admin"}

                    onClick={() => {
                      setListName(name);
                      setOpen(true);
                    }}
                    className="edit-button flex justify-center items-center p-2 border rounded-lg border-gray-100 hover:border-blue-500 hover:bg-gray-100"
                  >
                    < MdEdit color="blue"/>
                  </button>
                  <button
                    disabled={role !== "owner" && role !== "admin"}
                    onClick={() => handleDelete(id)}
                    className="delete-button flex justify-center items-center p-2 border rounded-lg border-gray-100 hover:border-red-500 hover:bg-gray-100"
                  >
                    <MdDelete color="red"/>
                  </button>
                </div>
          </div>
      </div>  
    </>
    )
};  