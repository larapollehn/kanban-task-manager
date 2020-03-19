import {SET_TITLE} from "./types";

export const setTitle = (title) => dispatch => {
        console.log("set title");
        dispatch({
            type: SET_TITLE,
            payload: title});
};