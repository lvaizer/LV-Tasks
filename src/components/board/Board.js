import '../../css/board.css';

import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getBoardById, updateBoard} from "../../redux/bordsSlice";
import NotFound from "../NotFound";
import ListItem from "../list/ListItem";
import CreateNewList from "../list/CreateNewList";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useEffect, useState} from "react";

export default function Board() {

    const dispatch = useDispatch();

    const {boardId} = useParams();

    const board = useSelector((state) => getBoardById(state.boards, boardId));

    const [isEdit, setIsEdit] = useState(false);

    const [editedName, setEditedName] = useState('')

    useEffect(() => {
        board && setEditedName(board.name);
    }, [board])

    function handleEditClicked() {
        setIsEdit(true)
    }

    function handleCancelClicked() {
        setEditedName(board.name);
        setIsEdit(false)
    }

    function handleSaveClicked() {
        dispatch(updateBoard({id: board.id, name: editedName}))
        setIsEdit(false)
    }

    if (!board) return <NotFound/>

    return (
        <div className="board">
            <div className="board__header">
                {isEdit ?
                    <div className="board__header_name_container">
                        <input className="board__header_name_input" value={editedName}
                               onChange={e => setEditedName(e.target.value)}/>
                        <button className="btn-reset board__header_name_cancel_button"
                                onClick={handleCancelClicked}>&#10007;</button>
                        <button className="btn-reset board__header_name_save_button"
                                onClick={handleSaveClicked}>&#10003;</button>
                    </div>
                    :
                    <h3 className="board__header_name" onClick={handleEditClicked}>{board.name}</h3>
                }
            </div>
            <DndProvider backend={HTML5Backend}>
                {board.lists.map(list => <ListItem key={list.id} {...list}/>)}
            </DndProvider>
            <CreateNewList boardId={boardId} isFirst={board.lists.length === 0}/>
        </div>
    )
}
