import {createId} from "../utills";

export const List = (name, boardId) => {
    return {
        id: createId(),
        boardId: boardId,
        name: name,
        tasks: []
    }
}
