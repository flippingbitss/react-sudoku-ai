import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

import SudokuApp from "./App";
import { Game } from "./Game";

ReactDOM.render(
  <SudokuApp store={new Game()} />,
  document.getElementById("root")
);
registerServiceWorker();
