import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const STATES = {
  WON: "WON",
  PROGRESS: "PROGRESS",
  PAUSED: "PAUSED",
  PRESTART: "PRESTART"
};


class SudokuApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      board: this.board,
      gameState: STATES.PRESTART,
      startTime: Date.now(),
      currentTime: Date.now(),
      interval: null
    };
  }

  board = "004300209005009001070060043006002087190007400050083000600000105003508690042910300"
    .split("")
    .map((val, i) => {
      let num = Number(val);

      return  Object.defineProperties({}, {
        editable: {
          value: num < 1,
          writable: false
        },
        value: {
          value: num,
          writable: num < 1
        },
        state: {
          value: "valid",
          writable: true
        }
      });
    });

  togglePause = () => {
    if (this.state.gameState == STATES.PAUSED)
      this.setState({ gameState: STATES.PROGRESS });
    else this.setState({ gameState: STATES.PAUSED });
  };

  handleTextInput = (index, e) => {
    console.log(e);
    let newBoard = this.state.board.slice();
    let curr = newBoard[index];

    curr.value = parseInt(e.target.value);

    // column and row number of the active element
    let col = index % 9;
    let row = Math.floor(index / 9);

    let matches = [];
    // validating the column
    for (let i = col; i < 81; i += 9) {
      let toMatch = newBoard[i];
      console.log(i, curr.value, toMatch.value);
      if (i != index && curr.value == toMatch.value) {
        matches.push(i);
      }
    }

    // validating the row
    for (let i = row * 9; i < (row + 1) * 9; ++i) {
      let toMatch = newBoard[i];
      console.log(i);
      if (i != index && curr.value == toMatch.value) {
        matches.push(i);
      }
    }

    // validating the 9x9 block
    let blockRow = Math.floor(index / 27);
    let blockCol = Math.floor((index % 9) / 3);

    for (let i = blockRow * 27; i < (blockRow + 1) * 27; i += 9) {
      for (let j = blockCol * 3; j < (blockCol + 1) * 3; ++j) {
        let toMatch = this.board[i + j];
        if (i + j != index && curr.value == toMatch.value) {
          matches.push(i + j);
        }
      }
    }

    // reseting the state of each element
    let emptyCount = 0;
    for (let item of newBoard) {
      item.state = "valid";
      if (item.value == 0) emptyCount++;
    }

    for (let item of matches) newBoard[item].state = "error";

    this.setState({
      board: newBoard,
      gameState: !emptyCount ? STATES.WON : STATES.PROGRESS
    });
  };

  generateBoard = (isRoot, counter) => {
    let { board } = this.state;
    return (
      <div className="board">
        {Array(3)
          .fill()
          .map((val, i) => (
            <div key={i} className="row">
              {Array(3)
                .fill()
                .map((val, j) => {
                  if (isRoot) {
                    return (
                      <div key={j} className="square">
                        {this.generateBoard(false, (counter + i * 9 + j) * 3)}
                      </div>
                    );
                  }
                  let elIdx = ++counter + i * 6 - 1;
                  let elem = this.board[elIdx];
                  let value = board[elIdx].value;
                  if (elem.editable)
                    return (
                      <div key={j} className="square">
                        <input
                          className={`num-value ${elem.state}`}
                          type="number"
                          min="1"
                          max="9"
                          value={value || ""}
                          onChange={e => this.handleTextInput(elIdx, e)}
                        />
                      </div>
                    );

                  return (
                    <div key={j} className={`square fixed ${elem.state}`}>
                      {elem.value}
                    </div>
                  );
                })}
            </div>
          ))}
      </div>
    );
  };

  generateScreen = () => {
    if (this.state.gameState == STATES.PAUSED) {
      return (
        <div>
          <h2>PAUSED</h2>
        </div>
      );
    }

    return <div className="main">{this.generateBoard(true, 0)}</div>;
  };

  generateControls = () => {
    let text = this.state.gameState == STATES.PAUSED ? "RESUME" : "PAUSE";
    return (
      <div className="controls">
        <button onClick={this.togglePause}>{text}</button>
      </div>
    );
  };

  addSecond = () => {
    return setInterval(() => {
      this.state.currentTime = Date.now();
    }, 1000);
  };

  render() {
    const { gameState } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Sudoku</h2>
        </div>

        <div className="content-body">
          {this.generateScreen()}
          {this.generateControls()}

          <div className="notes" />
        </div>
      </div>
    );
  }
}

export default SudokuApp;
