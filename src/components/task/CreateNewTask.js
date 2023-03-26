import '../../css/createNewTaskButton.css';

import MyModal from "../modal/MyModal";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addTask} from "../../redux/bordsSlice";
import {Task} from "../../objects/Task";

const initialNewTaskInput = {
    value: '',
    class: '',
    placeholder: ''
};

export default function CreateNewTask(props) {

    const {listId, boardId} = props;

    const [modalIsOpen, setIsOpen] = useState(false);

    const [newTaskInputState, setNewTaskInputState] = useState(initialNewTaskInput);

    const dispatch = useDispatch();

    function handleCreateNewTaskClicked() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function onModalClosed() {
        setNewTaskInputState(initialNewTaskInput);
    }

    function handleSaveButtonClicked() {
        if (newTaskInputState.value.isEmpty()) {
            setNewTaskInputState(prevState => {
                return {...prevState, class: 'input-error', placeholder: 'Insert List Title'}
            })
            return;
        }
        const newTask = Task(newTaskInputState.value, boardId, listId);
        dispatch(addTask(newTask));
        setIsOpen(false);
    }

    const createNewTaskInputComponent = (
        <div className="createNewTaskButton__newTaskInput_container">
            <label className="createNewTaskButton__newTaskInput_label">Task content</label>
            <textarea
                autoFocus
                className={`input ${newTaskInputState.class} createNewTaskButton__newTaskInput_textarea`}
                value={newTaskInputState.value}
                placeholder={newTaskInputState.placeholder}
                onChange={(e) => setNewTaskInputState(prevState => {
                    return {...prevState, value: e.target.value};
                })}
            />
        </div>
    )

    return (
        <>
            <div className="createNewTaskButton" onClick={handleCreateNewTaskClicked}>
                <button className="btn-reset">
                    + add a task
                </button>
            </div>
            <MyModal
                openModal={modalIsOpen}
                size="small"
                title="Create new Task"
                saveButton="Create"
                body={createNewTaskInputComponent}
                onAfterClose={onModalClosed}
                handleSaveButtonClicked={handleSaveButtonClicked}
                closeModal={closeModal}
            />
        </>
    )
}
