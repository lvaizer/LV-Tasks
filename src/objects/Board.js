import {createId} from "../utills";

export const Board = (name) => {
    return {
        id: createId(),
        name: name,
        lists: []
    }
}

