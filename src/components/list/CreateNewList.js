import '../../css/createNewListButton.css';

import MyModal from "../modal/MyModal";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addList} from "../../redux/bordsSlice";
import {List} from "../../objects/List";

const initialNewListInput = {
    value: '',
    class: '',
    placeholder: ''
};
export default function CreateNewList(props) {

    const {boardId, isFirst} = props;

    const [modalIsOpen, setIsOpen] = useState(false);

    const [newListInputState, setNewListInputState] = useState(initialNewListInput);

    const dispatch = useDispatch();

    function handleCreateNewListClicked() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function onModalClosed() {
        setNewListInputState(initialNewListInput);
    }

    function handleSaveButtonClicked() {
        if (newListInputState.value.isEmpty()) {
            setNewListInputState(prevState => {
                return {...prevState, class: 'input-error', placeholder: 'Insert List Title'}
            })
            return;
        }
        const newList = List(newListInputState.value, boardId);
        dispatch(addList(newList));
        setIsOpen(false);
    }

    const createNewListInputComponent = (
        <div className="createListButton__newListInput_container">
            <label className="createListButton__newListInput_label">List title</label>
            <input
                autoFocus
                value={newListInputState.value}
                placeholder={newListInputState.placeholder}
                onKeyDown={(event) => {
                    if (event.key !== 'Enter') return;
                    handleSaveButtonClicked();
                }}
                onChange={(e) => setNewListInputState(prevState => {
                    return {...prevState, value: e.target.value};
                })}
                type="text"
                className={`input ${newListInputState.class}`}
            />
        </div>
    )

    return (
        <>
            <div className="createListButton__container" onClick={handleCreateNewListClicked}>
                <button className="btn-reset">
                    + Add {isFirst ? 'a' : 'another'} List
                </button>
            </div>
            <MyModal
                openModal={modalIsOpen}
                size="small"
                title="Create new List"
                saveButton="Create"
                body={createNewListInputComponent}
                onAfterClose={onModalClosed}
                handleSaveButtonClicked={handleSaveButtonClicked}
                closeModal={closeModal}
            />
        </>
    )
}
