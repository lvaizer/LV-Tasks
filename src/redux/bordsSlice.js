import {createSlice} from '@reduxjs/toolkit'
import {
    getListById,
    getTaskById,
    removeList,
    removeTask,
    setList,
    setTask
} from "./halperFunctions";

const initialState = {
    boards: [],
}

export const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setBoards: (state, action) => {
            state.boards = action.payload
        },
        /** Boards **/
        addBoard: (state, action) => {
            state.boards.push(action.payload)
        },
        updateBoard: (state, action) => {
            const board = state.boards.find(b => b.id === action.payload.id);
            Object.assign(board, action.payload);
        },
        deleteBoard: (state, action) => {
            state.boards = state.boards.filter(b => b.id !== action.payload);
        },
        /** Lists **/
        addList: (state, action) => {
            const board = state.boards.find(b => b.id === action.payload.boardId);
            board.lists.push(action.payload);
        },
        updateList: (state, action) => {
            const list = getListById(state.boards, action.payload.id);
            const modifiedList = {...list};
            Object.assign(modifiedList, action.payload);
            removeList(state.boards, list);
            setList(state.boards, modifiedList);
        },
        deleteList: (state, action) => {
            const list = getListById(state.boards, action.payload);
            removeList(state.boards,list);
        },
        /** Tasks **/
        addTask: (state, action) => {
            const board = state.boards.find(b => b.id === action.payload.boardId);
            const list = board.lists.find(l => l.id === action.payload.listId);
            list.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const task = getTaskById(state.boards, action.payload.id);
            const modifiedTask = {...task};
            Object.assign(modifiedTask, action.payload);
            removeTask(state.boards, task);
            setTask(state.boards, modifiedTask);
        },
        deleteTask: (state, action) => {
            const task = getTaskById(state.boards, action.payload);
            removeTask(state.boards, task);
        },

    },
})

export const getBoardById = (state, boardId) => {
    let board;
    state.boards.forEach(b => {
        if (b.id === boardId) board = b;
    });
    return board;
};

// Action creators are generated for each case reducer function
export const {
    setBoards,
    addBoard,
    updateBoard,
    deleteBoard,
    addList,
    updateList,
    deleteList,
    addTask,
    updateTask,
    deleteTask
} = boardsSlice.actions

export default boardsSlice.reducer
