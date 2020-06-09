import * as type from "./Types";

export const setBoard1 = (board) => dispatch => {
    dispatch({
        type: type.SET_BOARD_1,
        payload: board
    });
}

export const setBoard2 = (board) => dispatch => {
    dispatch({
        type: type.SET_BOARD_2,
        payload: board
    });
}
export const setBoard3 = (board) => dispatch => {
    dispatch({
        type: type.SET_BOARD_3,
        payload: board
    });
}