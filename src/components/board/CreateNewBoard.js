import '../../css/createNewBoardButton.css';

import {useState} from "react";
import {useDispatch} from "react-redux";
import {addBoard} from "../../redux/bordsSlice";
import MyModal from "../modal/MyModal";
import {Board} from "../../objects/Board";

const initialNewBoardInput = {
    value: '',
    class: '',
    placeholder: ''
};

export default function CreateNewBoard() {

    const [modalIsOpen, setIsOpen] = useState(false);

    const [newBoardInputState, setNewBoardInputState] = useState(initialNewBoardInput);

    const dispatch = useDispatch();

    function handleCreateBoardClicked() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function onModalClosed() {
        setNewBoardInputState(initialNewBoardInput);
    }

    function handleSaveButtonClicked() {
        if (newBoardInputState.value.isEmpty()) {
            setNewBoardInputState(prevState => {
                return {...prevState, class: 'input-error', placeholder: 'Insert Board Title'}
            })
            return;
        }
        const newBoard = Board(newBoardInputState.value);
        dispatch(addBoard(newBoard));
        setIsOpen(false);
        window.location.href = 'board/' + newBoard.id;
    }

    const addNewBoardInputComponent = (
        <div className="boardItem__newBoardInput_container">
            <label className="boardItem__newBoardInput_label">Board title</label>
            <input
                autoFocus
                className={`input ${newBoardInputState.class}`}
                value={newBoardInputState.value}
                placeholder={newBoardInputState.placeholder}
                onKeyDown={(event) => {
                    if (event.key !== 'Enter') return;
                    handleSaveButtonClicked();
                }}
                onChange={(e) => setNewBoardInputState(prevState => {
                    return {...prevState, value: e.target.value};
                })}
                type="text"
            />
        </div>
    )

    return (
        <>
            <div className="boardItem__container createBoardButton"
                 onClick={handleCreateBoardClicked}>
                <button className="btn-reset">
                    Create new board
                </button>
            </div>
            <MyModal
                openModal={modalIsOpen}
                size="small"
                title="Add new Board"
                saveButton="ADD"
                body={addNewBoardInputComponent}
                onAfterClose={onModalClosed}
                handleSaveButtonClicked={handleSaveButtonClicked}
                closeModal={closeModal}
            />
        </>
    )
}
