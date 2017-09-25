import { Component } from "react";
import { observable } from "mobx";
import { STATES } from "./constants";

export class Game extends Component {
  @observable
  board = "004300209005009001070060043006002087190007400050083000600000105003508690042910300"
    .split("")
    .map((val, i) => {
      let num = Number(val);
      return {
        editable:  num < 1,
        value: num,
        errorBy: i,
        state: "valid",
      };
    });

  @observable gameState = STATES.PRESTART;

  startTime = Date.now();
  @observable currentTime = Date.now();
  @observable interval = null;
}