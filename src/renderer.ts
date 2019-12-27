import "./index.css";

import { render } from "react-dom";
import { createElement } from "react";
import { App } from "./components/App";

render(createElement(App), document.getElementById("root"));
