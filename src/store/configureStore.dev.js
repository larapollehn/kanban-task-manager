import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export function configureStore() {
    return createStore(() => {}, composeWithDevTools());
}