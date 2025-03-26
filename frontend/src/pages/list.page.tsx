import { useState, FC, FormEvent, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector} from "../redux/redux";
import { setSkip, fetchLists, addList} from "../redux/slicers/lists.slicer";
import { ListItem } from "../components/list-item";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { ErrorToaster } from "../components/error-toast";

export const ListPage: FC = () => {
    const [page, setPage] = useState(1); 
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [newList, setNewList] = useState("");
    const [maxPage, setMaxPage] = useState(1);
    const { token } = useAppSelector(state => state.auth);
    const {take, skip, lists, total} = useAppSelector(state => state.lists);

    useEffect(() => {
        if (total && take) {
            setMaxPage(Math.ceil(total / take));
          }
        if (!token){ 
            navigate("/login");
            return;
        }
        dispatch(fetchLists({take, skip, token}));
    }, [dispatch, skip, take, token, navigate, total]);

    const addNewList = (e: FormEvent) => {
        e.preventDefault();
        if (!token) { 
            navigate("/login");
            return;
        }
        dispatch(addList({name: newList, token}));
        setNewList("");
    }
    return (<>
            <ErrorToaster/>
    
            <section className="lists-container max-w-lg w-full mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg flex flex-col justify-start items-center h-screen gap-4 overflow-hidden">
                <h2 className="text-2xl w-full font-bold text-center text-gray-700">Lists</h2>

                <div className="flex flex-row justify-center items-center w-full max-w-xs mb-2">
                    <input
                    type="text"
                    className="flex-1 p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                    placeholder="Add a new list..."
                    value={newList}
                    onChange={(e) => setNewList(e.target.value)}
                    />
                    <button
                    onClick={addNewList}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                    Add
                    </button>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-2 w-full max-w-xs flex-grow overflow-y-auto">
                    {lists.map((item) => (
                    <ListItem key={item.id} id={item.id} name={item.name} role={item.role} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="w-full max-w-xs flex flex-row justify-between items-center mt-auto">
                    <button
                    className="w-8 h-8 flex justify-center items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                            dispatch(setSkip((page - 2) * take));
                        }
                    }}
                    >
                    <MdNavigateBefore />
                    </button>

                    <div className="flex w-10 h-10 items-center justify-center border border-blue-500 bg-white text-gray-700 rounded-lg">
                    <p className="text-gray-700">{page}</p>
                    </div>

                    <button
                    className="w-8 h-8 flex justify-center items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => {
                        if (page < maxPage){ 
                            setPage(page + 1);
                            dispatch(setSkip(page * take));
                        }
                    }}
                    >
                    <MdNavigateNext />
                    </button>
                </div>
            </section>
        </>
    );
};
