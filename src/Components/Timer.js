
import React from 'react';
import Board from "./Components/Board"
import { Game } from "./Components/Game";
import SpotInOptions, { get_opp_color } from "./Components/Methods"
import Timer from "./Components/Timer"

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      piece: null,
      game: new Game(),
      move_options: [],
      status: "",
      winner: ""
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
        this.setState({winner: get_opp_color(this.state.game.turn)})
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

  outOfTime = (color) => {
    this.setState({winner: get_opp_color(color)})
  }
  
  render () {
    return(
      <div className="game">
        <div className="left">
          <h1 className="status">{this.state.status}</h1>
          {/* <h1 className="status">{this.state.winner}</h1> */}
        </div>
        
        <Board board = {this.state.game.board} move_options = {this.state.move_options} handleClick = {this.handleClick}/>
        <div className="timers">
          <Timer color = 'b' turn = {this.state.game.turn} outOfTime = {this.outOfTime}/>
          <Timer color = 'w' turn = {this.state.game.turn} outOfTime = {this.outOfTime}/>
        </div>
      </div>
     
    )
  }
}

export default App;
