import React, { useState, FC, FormEvent, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector} from "../redux/redux";
import { setSkip, setTake, fetchLists } from "../redux/slicers/lists.slicer";
import { ListItem } from "../components/list-item";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
export const ListPage: FC = () => {
    const [page, setPage] = useState(1); 
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);
    const {take, skip, lists} = useAppSelector(state => state.lists);

    useEffect(() => {
        if (!token){ 
            navigate("/login");
            return;
        }
        dispatch(fetchLists({take, skip, token}));
    }, [dispatch, skip, take, lists]);


    return (
        <section className="lists-container max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg flex flex-col justify-center items-start h-screen gap-4">
                <h2 className="text-2xl w-full font-bold text-center mb-4 text-gray-700">Lists</h2>
                <div className="flex flex-row justify-center items-center w-96  mb-4">
                    <input
                        type="text"
                        className="basic-1 p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        // value={newTask}
                        // onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new list..."
                        />
                    <button
                        // onClick={addTask}
                        className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                    Add
                    </button>
                </div>
                <div className="flex flex-col gap-2 w-96 justify-center items-start max-h-80">
                    {lists.map(item => <ListItem key={item.id} id={item.id} name={item.name}></ListItem>)}
                </div>
                <div className="w-full flex flex-row justify-between items-center mg mb-4">
                    <button className="w-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" onClick={() => {
                        if(page > 1){ 
                            setPage(page - 1); 
                            dispatch(setSkip(page * take));
                            // dispatch()
                            // dispatch(fetchLists());
                        }
                    }}><MdNavigateBefore/></button>
                    <div className="flex w-5 h-5 flex-row gap-2 items-center justify-center mg border border-blue-500 bg-white-500 text-gray-700 py-2 rounded-lg  ">

                        <p className="text-gray-700">{page}</p>
                    </div>
                    <button className="w-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" onClick={() => {}}><MdNavigateNext/></button>
                </div>
        </section>
    );
};
