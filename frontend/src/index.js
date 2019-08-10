import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import store from "./store";
import { BrowserRouter as Router, Route } from 'react-router-dom'

const render = () => {
    ReactDOM.render(
        <App store={store} />,
        document.getElementById("root")
    );
}

render();
store.subscribe(render);