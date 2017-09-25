import React, { Component } from "react";
import { observer } from "mobx-react";

import { STATES } from "./constants";
import logo from "./logo.svg";
import "./App.css";

@observer
class SudokuApp extends Component {
  constructor(props,context){
    super(props,context);
    window.board = this.props.store.board;
  }

  setGameState = gameState => {
    this.props.store.gameState = gameState;
  };

  updateBoard = () => {
    let board = this.props.store.board;
    // column and row number of the active element
    let matches = [];
    
    for(let index=0; index<81; ++index){

    let col = index % 9;
    let row = Math.floor(index / 9);
    let curr = board[index];

    // validating the column
    for (let i = col; i < 81; i += 9) {
      let toMatch = board[i];
      if (i != index && curr.value == toMatch.value) {
        matches.push(i);
      }
    }

    // validating the row
    for (let i = row * 9; i < (row + 1) * 9; ++i) {
      let toMatch = board[i];
      if (i != index && curr.value == toMatch.value) {
        matches.push(i);
      }
    }

    // validating the 9x9 block
    let blockRow = Math.floor(index / 27);
    let blockCol = Math.floor((index % 9) / 3);

    for (let i = blockRow * 27; i < (blockRow + 1) * 27; i += 9) {
      for (let j = blockCol * 3; j < (blockCol + 1) * 3; ++j) {
        let toMatch = board[i + j];
        if (i + j != index && curr.value == toMatch.value) {
          matches.push(i + j);
        }
      }
    }
  }
    // reseting the state of each element
    let emptyCount = 0;
    for (let item of board) {
       item.state = "valid";
      if (item.value == 0) emptyCount++;
    }

    if (matches.length) curr.state = "error";
    for (let item of matches) board[item].state = "error";


    // no errors and no empty cell mean victory
    if (!emptyCount && !matches.length) this.setGameState(STATES.WON);
  }

  handleTextInput = (index, e) => {
    let board = this.props.store.board;
    let curr = board[index];

    curr.value = parseInt(e.target.value,10);
  };

  generateBoard = (isRoot, counter) => {
    let { board } = this.props.store;
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
                  let elem = board[elIdx];
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
    if (this.props.store.gameState == STATES.PAUSED) {
      return (
        <div>
          <h2>PAUSED</h2>
        </div>
      );
    }
    return <div className="main">{this.generateBoard(true, 0)}</div>;
  };

  generateControls = () => {
    let gameState = this.props.store.gameState;
    let text = gameState == STATES.PAUSED ? "RESUME" : "PAUSE";
    return (
      <div className="controls">
        
        <button onClick={()=>this.setGameState(STATES.PAUSED)}>{text}</button>
      </div>
    );
  };

  addSecond = () => {
    return setInterval(() => {
      this.props.store.currentTime = Date.now();
    }, 1000);
  };

  render() {
    const { gameState } = this.props.store;
    console.log(gameState, "test game state")
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
