import '../../css/board.css';

import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getBoardById, updateBoard} from "../../redux/bordsSlice";
import NotFound from "../NotFound";
import ListItem from "../list/ListItem";
import CreateNewList from "../list/CreateNewList";
import {DndProvider} from 'react-dnd';
import {TouchBackend} from 'react-dnd-touch-backend'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {isMobile} from 'react-device-detect';
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

    const hasNative = document && (document.elementsFromPoint || document.msElementsFromPoint)

    function getDropTargetElementsAtPoint(x, y, dropTargets) {
        return dropTargets.filter((t) => {
            const rect = t.getBoundingClientRect()
            return (
                x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top
            )
        })
    }

    const backendOptions = {
        getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint,
        enableMouseEvents: true
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
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend} options={backendOptions}>
                {board.lists.map(list => <ListItem key={list.id} {...list}/>)}
            </DndProvider>
            <CreateNewList boardId={boardId} isFirst={board.lists.length === 0}/>
        </div>
    )
}
