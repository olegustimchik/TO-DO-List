import React from "react";
import { FC, FormEvent, useEffect } from "react";
import { MdEdit, MdDelete} from "react-icons/md";


type ListItemProps = { id: string, name: string };
export const ListItem: FC<ListItemProps> = ({id, name }) => {
    return (
    <div key={id} className=" basis-3xs w-full p-5  h-8 justify-center items-center border border-gray-100 bg-white-500 text-gray-700 py-2 rounded-lg hover:border-blue-500 ">
        <div className="flex flex-row gap-2 items-center justify-between m-2">
            <h2 className="">{name}</h2>
            <div className="todo-actions flex flex-row gap-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="edit-button flex justify-center items-center p-2 border rounded-lg border-gray-100 hover:border-blue-500 hover:bg-gray-100"
                >
                  < MdEdit color="blue"/>
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="delete-button flex justify-center items-center p-2 border rounded-lg border-gray-100 hover:border-red-500 hover:bg-gray-100"
                >
                  <MdDelete color="red"/>
                </button>
              </div>
        </div>
    </div>  
    )
};  