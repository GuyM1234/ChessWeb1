
import React from 'react';
import Board from "./Components/Board"
import GameBoard from './Components/GameBoard';

class App extends React.Component {
  constructor () {
    super()
    this.game_board = new GameBoard()
    this.board = this.game_board.board
    this.state = {
      piece: " ",
      move_options: []
    }
  }

  handlePiece = (piece) => {
    console.log(this.board)
    if (this.state.piece === " "){
      const move_options = piece.move_options(this.board) 
      this.setState({piece: piece, move_options: move_options}, () => {
        console.log(this.state)
      })     
    }
    else{
      if (this.IsSpotInOptions(piece.spot)){
        const chosen_spot = [this.state.piece.spot[0],this.state.piece.spot[1]]
        this.board[chosen_spot[0]][chosen_spot[1]].move(piece.spot,this.game_board)
      }
      this.setState({piece:" ", move_options:[]}, () =>{
        console.log(this.state)
      })
    }
  }

  IsSpotInOptions =  (spot) => {
    for (let index = 0; index < this.state.move_options.length; index++) {
      const element = this.state.move_options[index];
      if (element[0] === spot[0] && element[1] === spot[1]){
        console.log("found")
        return true
      }
    }
    return false
  }

  render () {
    return(
      <Board board = {this.board} handlePiece = {this.handlePiece} />
    )
  }
}

export default App;
