import {SET_TITLE} from "../actions/types";

const initialState = {
    title: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TITLE:
            console.log("reducer");
            return {
                ...state,
                title: action.payload
            };
        default:
            return state;

    }
}