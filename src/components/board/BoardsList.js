import '../../css/boardsList.css';

import {useSelector} from 'react-redux'
import BoardItem from "./BoardItem";
import CreateNewBoard from "./CreateNewBoard";

export default function BoardsList() {

    const boards = useSelector((state) => state.boards.boards);

    return (
        <div className="boardList">
            <CreateNewBoard/>
            {boards.map(b => <BoardItem key={b.id} {...b}/>)}
        </div>
    )
}
