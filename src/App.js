import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import '../public/stylo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './stores/store';
import Home from "./components/Home";
import BoardView from "./components/BoardView";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter basename={'/project/kanban'}>
                <Switch>
                    <Route path="/" exact><Home/></Route>
                    <Route path="/boardView" componet={BoardView}><BoardView/></Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
