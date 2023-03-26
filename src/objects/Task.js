import {createId} from "../utills";

export const Task = (content, boardId, listId) => {
    return {
        id: createId(),
        boardId: boardId,
        listId: listId,
        content: content
    }
}
