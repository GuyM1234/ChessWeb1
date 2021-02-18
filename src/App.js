
import React from 'react';
import Board from "./Components/Board"
import { Game } from "./Components/Game";
import SpotInOptions from "./Components/Methods"
import Timer from "./Components/Timer"

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      piece: null,
      game: new Game(),
      move_options: [],
      status: "",

    }
  }

  handleClick = (piece) => {
    const row = piece.spot[0]
    const column = piece.spot[1]
    this.setState(prevState => {
      if (this.state.piece == null) {
        if (this.state.game.turn === piece.color) {
          const move_options = piece.getAvaliableMoves(prevState.game)
          if (move_options.length > 0) { 
            return {piece: piece, move_options: move_options}
          }
        }
      }
      else{
        
        if (SpotInOptions(piece.spot, this.state.move_options)) {
          prevState.game.board[prevState.piece.spot[0]][prevState.piece.spot[1]].move([row,column],this.state.game)
          prevState.game.updateTurn()
        }
        return {piece: null, game: prevState.game, move_options: [], status: this.updateStatus(prevState.game)}
      }
    })
  }

  updateStatus = () => {
    if (this.state.game.isCheck()) {
      if (this.state.game.isCheckMate()) {
        return "CHECKMATE!"
      }
      else{
        return "CHECK!"
      }
    }
    else if (this.state.game.isPat()){
      return "PAT!"
    }
    else{
      return " "
    }
  }

  render () {
    return(
      <div className="game">
        {/* <h1 className="status">{this.state.status}</h1> */}
        <h1 className="status">{window.token}</h1>
        <Board board = {this.state.game.board} move_options = {this.state.move_options} handleClick = {this.handleClick}/>
        <div className="timers">
          <Timer color = 'b' turn = {this.state.game.turn}/>
          <Timer color = 'w' turn = {this.state.game.turn}/>
        </div>
      </div>
     
    )
  }
}

export default App;
