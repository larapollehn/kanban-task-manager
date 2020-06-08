import {SET_BOARD_1, SET_BOARD_2, SET_BOARD_3} from "../actions/types";
import Board from "../Models/Board";

const initialState = {
    board1: new Board('untitled', []),
    board2: new Board('untitled', []),
    board3: new Board('untitled', [])
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_BOARD_1:
            return{
                ...state,
                board1: action.payload
            }
        case SET_BOARD_2:
            return{
                ...state,
                board1: action.payload
            }
        case SET_BOARD_3:
            return{
                ...state,
                board1: action.payload
            }
        default:
            return state
    }
}