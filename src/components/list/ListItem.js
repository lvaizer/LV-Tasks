import '../../css/listItem.css';

import TaskItem from "../task/TaskItem";
import AddNewTask from "../task/CreateNewTask";
import settingsIcon from "../../assets/images/settings_ic_dark.svg";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDrop} from 'react-dnd'
import {useDispatch} from "react-redux";
import {deleteList, updateList, updateTask} from "../../redux/bordsSlice";
import PopupMenu, {createMenuButton} from "../popupmenu/PopupMenu";

export default function ListItem(props) {

    const {id, boardId, name, tasks} = props;

    const dispatch = useDispatch();

    const buttonRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [editedName, setEditedName] = useState(name);

    const [menuOptions, setMenuOptions] = useState({
        handleCloseMenu: () => {
            setIsMenuOpen(false)
        },
        title: name,
        buttons: [createMenuButton('Delete', handleDeleteClicked, true)]
    });

    useEffect(() => {
        if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            setMenuOptions(prevState => {
                return {
                    ...prevState,
                    top: buttonRect.top,
                    left: buttonRect.right,
                }
            });
        }
    }, [isMenuOpen])

    const handleDrop = useCallback((item) => {
        if (item.listId === id) return;
        item.listId = id;
        item.boardId = boardId;
        dispatch(updateTask(item))
        // eslint-disable-next-line
    }, [])

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: 'all',
            drop(_item, monitor) {
                handleDrop(monitor.getItem())
                return undefined
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                draggingColor: monitor.getItemType(),
            }),
        }),
        [handleDrop],
    )

    function handleDeleteClicked() {
        // eslint-disable-next-line
        if (!confirm('Are you sure you want to delete the "' + name + '" board?')) return;
        dispatch(deleteList(id))
    }

    function handleMenuClicked() {
        setIsMenuOpen(!isMenuOpen)
    }

    function handleEditClicked() {
        setIsEdit(true)
    }

    function handleSaveClicked() {
        dispatch(updateList({id: id, name: editedName}))
        setIsEdit(false)
    }


    function handleCancelClicked() {
        setEditedName(name);
        setIsEdit(false)
    }

    return (
        // eslint-disable-next-line
        <div ref={drop} role="TargetBox"
             className={`listItem ${isOver && 'listItem_draggable_over'}`}>
            <div className="listItem__header">
                {isEdit ?
                    <div className="listItem__name_container">
                        <input className="listItem__name_input" value={editedName}
                               onChange={e => setEditedName(e.target.value)}/>
                        <button className="btn-reset listItem__name_cancel_button"
                                onClick={handleCancelClicked}>&#10007;</button>
                        <button className="btn-reset listItem__name_save_button"
                                onClick={handleSaveClicked}>&#10003;</button>
                    </div>
                    :
                    <h3 className="listItem__name" onClick={handleEditClicked}>{name}</h3>
                }
                <img ref={buttonRef} className="listItem_settings"
                     onClick={handleMenuClicked} alt="settings"
                     src={settingsIcon}/>
            </div>

            <div className="listItem__tasks_list">
                {tasks.map(task => <TaskItem key={task.id} {...task}/>)}
            </div>
            <AddNewTask listId={id} boardId={boardId}/>
            <PopupMenu isOpen={isMenuOpen}{...menuOptions}/>
        </div>
    )
}
