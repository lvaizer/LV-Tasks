import '../../css/baordItem.css';

import {Link} from "react-router-dom";

export default function BoardItem(props) {
    
    const {id, name} = props;

    return (
        <div className="boardItem__container">
            <Link className="boardItem__link" to={`./board/${id}`}>
                <div className="boardItem__mask">
                    <h3 className="boardItem__name">{name}</h3>
                </div>
            </Link>
        </div>

    )
}
