import {configureStore} from '@reduxjs/toolkit'
import boardsReducer from "./bordsSlice";

export const store = configureStore({
    reducer: {
        boards: boardsReducer
    },
})
