import '../../css/navbarBoardItem.css';

import settingsIcon from '../../assets/images/settings_ic.svg';
import {Link} from "react-router-dom";
import listIcon from '../../assets/images/list.svg'
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteBoard} from "../../redux/bordsSlice";
import PopupMenu, {createMenuButton} from "../popupmenu/PopupMenu";

export default function NavbarBoardItem(props) {

    const {id, name} = props;

    const dispatch = useDispatch();

    const buttonRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    function handleDeleteClicked() {
        // eslint-disable-next-line
        if (!confirm('Are you sure you want to delete the "' + name + '" board?')) return;
        dispatch(deleteBoard(id))
    }

    function handleMenuClicked() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <li className="navbarBoardItem">
            <img className="navbarBoardItem_icon" alt="list icon" src={listIcon}/>
            <Link className="navbarBoardItem_link" to={`/board/${id}`}>{name}</Link>
            <img ref={buttonRef} className="navbarBoardItem_settings"
                 onClick={handleMenuClicked} alt="settings"
                 src={settingsIcon}/>
            <PopupMenu isOpen={isMenuOpen}{...menuOptions}/>
        </li>
    )
}
