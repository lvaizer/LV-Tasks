import '../../css/popupMenu.css';

import {createPortal} from 'react-dom';
import {useRef} from "react";
import {createId, useOutsideAlerter} from "../../utills";

export const createMenuButton = (text, callback, isError) => {
    return {text: text, callback: callback, isError: isError}
}

export default function PopupMenu(props) {
    const menuOptions = props;
    const clickRef = useRef();

    function handleCloseMenuClicked() {
        menuOptions.handleCloseMenu()
    }

    useOutsideAlerter(clickRef, handleCloseMenuClicked);

    function handleButtonClicked(callback) {
        handleCloseMenuClicked()
        callback && callback();
    }

    if (!menuOptions || !menuOptions.isOpen) return <></>

    const buttons = (!menuOptions || menuOptions.buttons.length === 0) ? <></> :
        menuOptions.buttons.map(button => <div
            key={createId()}
            className={`popupMenu__item ${button.isError && 'error'}`}
            onClick={() => handleButtonClicked(button.callback)}>{button.text}
        </div>)

    return (
        <>
            {menuOptions.top > 0 && createPortal(
                <div ref={clickRef} className="popupMenu"
                     style={{top: menuOptions.top, left: menuOptions.left}}>
                    <header className="popupMenu__header">
                        <h4 className="popupMenu__title">{menuOptions.title}</h4>
                        <button className="btn-reset popupMenu__close_img_container"
                                onClick={handleCloseMenuClicked}>
                            &times;
                        </button>
                    </header>
                    <div className="popupMenu__items_container">
                        {buttons}
                    </div>
                </div>
                , document.body)}
        </>
    )
}
