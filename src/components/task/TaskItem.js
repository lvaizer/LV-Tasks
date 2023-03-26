import '../../css/taskItem.css';

import {useDrag} from 'react-dnd'
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteTask, updateTask} from "../../redux/bordsSlice";

export default function TaskItem(props) {

    const {id, content, listId} = props;

    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);

    const textAreaRef = useRef(null);

    const [editedContent, setEditedContent] = useState(content);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = (scrollHeight + 12) + "px";
        }
    }, [textAreaRef, editedContent, isEdit]);

    const [{isDragging}, drag] = useDrag(
        () => ({
            type: 'all',
            item: {id: id, listId: listId},
            canDrag: true,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id],
    )

    function handleEditClicked() {
        setIsEdit(!isEdit);
    }

    function onTextChanged(e) {
        setEditedContent(e.target.value);
    }

    function handleCancelClicked() {
        setIsEdit(false);
        setEditedContent(content);
    }

    function handleDeleteClicked() {
        // eslint-disable-next-line
        if (!confirm('Are you sure you want to delete')) return;
        dispatch(deleteTask(id));
        setIsEdit(false);
    }

    function handleSaveClicked() {
        dispatch(updateTask({id: id, content: editedContent}))
        setIsEdit(false);
    }

    return (
        <div ref={drag}
             className={`taskItem ${isDragging && 'taskItem__dragging'}`}>
            {isEdit ?
                <div className="taskItem_edit_container">
                    <button onClick={handleCancelClicked}
                            className="btn-reset taskItem_edit_close_btn">
                        &times;
                    </button>
                    <textarea ref={textAreaRef} autoFocus
                              onChange={onTextChanged}
                              value={editedContent}
                              className="taskItem__textarea"/>
                    <div className="taskItem_edit_btn_container">
                        <button onClick={handleDeleteClicked}
                                className="btn-reset taskItem_edit_delete_btn">
                            delete
                        </button>
                        <button onClick={handleSaveClicked}
                                className="btn-reset taskItem_edit_save_btn">
                            save
                        </button>
                    </div>
                </div>
                :
                <div className="taskItem_container">
                    <button onClick={handleEditClicked}
                            className="btn-reset taskItem_edit_button">
                        &#9998;
                    </button>
                    <p>
                        {content.split('\n').map((line, index) => (
                            <span key={index}>
                                 {line}
                                <br/>
                             </span>
                        ))}
                    </p>
                </div>
            }
        </div>
    )
}
