import '../../css/navbar.css'

import {useSelector} from "react-redux";
import NavbarBoardItem from './NavbarBoardItem';
import {Link} from "react-router-dom";

export default function Navbar() {

    const boards = useSelector((state) => state.boards.boards);

    return (
        <div className="navbar">
            <li className="navbarBoardItem">
                <Link to={`/`} className="navbarBoardItem_link"><h4>Boards</h4></Link>
            </li>
            <h5>Your boards</h5>
            {boards.map(b => <NavbarBoardItem key={b.id} {...b}/>)}
        </div>
    )
}
