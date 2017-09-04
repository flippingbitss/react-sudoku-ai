import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const STATES = {
  WON:"WON", PROGRESS:"PROGRESS", PAUSED:"PAUSED"
}

class SudokuApp extends Component {
    constructor(props,context){
      super(props,context);

      this.state={
        board: this.board,
        current:{
          value: "",
          index: -1
        },
        gameState: STATES.PROGRESS
      }
    }

   board = "004300209005009001070060043006002087190007400050083000600000105003508690042910300".split("").map((val,i)=>{
     let num = Number(val)
     let meta = {}

     Object.defineProperties(meta,
      {
        "editable": {
          value: num < 1, 
          writable:false
      }, 
        "value": {
          value: num,
          writable: num < 1
      },
      "state":{
          value: "valid"
      }
      })

     return meta
   })
   

   handleTextInput = (e,index) => {
     console.log(e.target.value)
    let newBoard = this.state.board.slice();
    newBoard[index].value = e.target.value
    this.setState({board: newBoard})
   }


   setAndValidate = (index,newValue,e)=>{

    console.log(e)
      let newBoard = this.state.board.slice();
      let curr = newBoard[index] = newValue;

      let col = index % 9;
      let row = Math.floor(index / 9);

      let matches = []
      console.log(index)
      console.log("column")
      
      for(let i=col; i<81; i+=9){
        let toMatch = newBoard[i]
        console.log(i,curr.value,toMatch.value)
        if(i != index && curr.value == toMatch.value){
            matches.push(i)
        }
      }

      console.log("row")
      for(let i=row*9; i< (row+1)*9; ++i){
        let toMatch = newBoard[i]
        console.log(i)
        if(i != index && curr.value == toMatch.value){
            matches.push(i)
        }
      }



      
      let blockRow = Math.floor(index / 27)
      let blockCol = Math.floor(index % 9 / 3)
      console.log('block',blockRow,blockCol)
      

      for(let i=blockRow*27; i < (blockRow+1)*27; i+=9){
        for(let j=blockCol*3; j < (blockCol+1)*3; ++j){
          let toMatch = this.board[i+j];
          if((i+j) != index && curr.value == toMatch.value){
            matches.push(i+j)
          }
        }
        console.log();
      }

      console.log(matches);

   }


  // 864371259325849761971265843436192587198657432257483916689734125713528694542916378
  // Array(81)
  //   .fill()
  //   .map((v, i) => i + 1);

  generateBoard = (isRoot,counter) => {
    let {board} = this.state;
    return (
      <div className="board">
        {Array(3).fill().map((val, i) => 
        <div key={i} className="row">
          {Array(3).fill().map((val, j) =>{
            
            if(isRoot){
                return <div key={j} className="square">{this.generateBoard(false,(counter+i*9+j)*3)}</div>
            }
            let elIdx = ++counter+i*6-1;
            let elem = this.board[elIdx];
            let value = board[elIdx].value
            if(elem.editable)
              return <div key={j} className="square"><input className={`num-value ${elem.state}`} type="number" min="1" max="9" value={value || ""} onChange={(e)=>this.handleTextInput(e,elIdx)}  onBlur={(e)=>this.setAndValidate(elIdx,value,e)}  /></div>
            
            return <div key={j} className="square fixed">{elem.value}</div>
          })

          }
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Sudoku</h2>
        </div>

        <div className="content-body">
          <div className="main">

            {this.generateBoard(true,0)}


            {/* <div className="board">
              <div className="row">
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">2</div>
                      <div className="square">3</div>
                    </div>
                    <div className="row">
                      <div className="square">4</div>
                      <div className="square">5</div>
                      <div className="square">6</div>
                    </div>
                    <div className="row">
                      <div className="square">7</div>
                      <div className="square">8</div>
                      <div className="square">9</div>
                    </div>
                  </div>
                </div>
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">2</div>
                      <div className="square">3</div>
                    </div>
                    <div className="row">
                      <div className="square">4</div>
                      <div className="square">5</div>
                      <div className="square">6</div>
                    </div>
                    <div className="row">
                      <div className="square">7</div>
                      <div className="square">8</div>
                      <div className="square">9</div>
                    </div>
                  </div>
                </div>
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">2</div>
                      <div className="square">3</div>
                    </div>
                    <div className="row">
                      <div className="square">4</div>
                      <div className="square">5</div>
                      <div className="square">6</div>
                    </div>
                    <div className="row">
                      <div className="square">7</div>
                      <div className="square">8</div>
                      <div className="square">9</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">2</div>
                      <div className="square">3</div>
                    </div>
                    <div className="row">
                      <div className="square">4</div>
                      <div className="square">5</div>
                      <div className="square">6</div>
                    </div>
                    <div className="row">
                      <div className="square">7</div>
                      <div className="square">8</div>
                      <div className="square">9</div>
                    </div>
                  </div>
                </div>
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">1</div>
                      <div className="square">1</div>
                    </div>
                    <div className="row">
                      <div className="square">2</div>
                      <div className="square">2</div>
                      <div className="square">2</div>
                    </div>
                    <div className="row">
                      <div className="square">3</div>
                      <div className="square">3</div>
                      <div className="square">3</div>
                    </div>
                  </div>
                </div>
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">1</div>
                      <div className="square">1</div>
                    </div>
                    <div className="row">
                      <div className="square">2</div>
                      <div className="square">2</div>
                      <div className="square">2</div>
                    </div>
                    <div className="row">
                      <div className="square">3</div>
                      <div className="square">3</div>
                      <div className="square">3</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">1</div>
                      <div className="square">1</div>
                    </div>
                    <div className="row">
                      <div className="square">2</div>
                      <div className="square">2</div>
                      <div className="square">2</div>
                    </div>
                    <div className="row">
                      <div className="square">3</div>
                      <div className="square">3</div>
                      <div className="square">3</div>
                    </div>
                  </div>
                </div>
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">1</div>
                      <div className="square">1</div>
                    </div>
                    <div className="row">
                      <div className="square">2</div>
                      <div className="square">2</div>
                      <div className="square">2</div>
                    </div>
                    <div className="row">
                      <div className="square">3</div>
                      <div className="square">3</div>
                      <div className="square">3</div>
                    </div>
                  </div>
                </div>
                <div className="square">
                  <div className="board">
                    <div className="row">
                      <div className="square">1</div>
                      <div className="square">1</div>
                      <div className="square">1</div>
                    </div>
                    <div className="row">
                      <div className="square">2</div>
                      <div className="square">2</div>
                      <div className="square">2</div>
                    </div>
                    <div className="row">
                      <div className="square">3</div>
                      <div className="square">3</div>
                      <div className="square">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default SudokuApp;
