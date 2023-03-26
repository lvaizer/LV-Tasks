import './css/app.css';
import './utills';
import {Route, Routes} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import BoardsList from "./components/board/BoardsList";
import NotFound from "./components/NotFound";
import Board from "./components/board/Board";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {setBoards} from "./redux/bordsSlice";
import PopupMenu from "./components/popupmenu/PopupMenu";

function App() {

    const dispatch = useDispatch();

    const isFirstMount = useRef(true);

    const boards = useSelector((state) => state.boards.boards);

    useEffect(() => {
        const savedBoards = localStorage.getItem('boards');
        if (savedBoards) dispatch(setBoards(JSON.parse(savedBoards)));
    }, []);

    useEffect(() => {
        if (!isFirstMount.current) {
            saveBoards();
        } else {
            isFirstMount.current = false;
        }
    }, [boards]);

    function saveBoards() {
        localStorage.setItem('boards', JSON.stringify(boards));
    }

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<BoardsList/>}/>
                    <Route path="board/:boardId" element={<Board/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
            <PopupMenu/>
        </div>
    );
}

export default App;
