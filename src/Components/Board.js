import React from "react";
import Block from "./Block"
import GameBoard from "./GameBoard"

class Board extends React.Component {

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
        if (this.state.piece === " ") {
          const move_options = piece.move_options(this.board) 
          if (move_options.length > 0 ){
            this.setState({piece: piece, move_options: move_options})    
          }
        }
        else {
          if (this.IsSpotInOptions(piece.spot)) {
            this.board[this.state.piece.spot[0]][this.state.piece.spot[1]].move(piece.spot, this.game_board)
          }
          this.setState({piece:" ", move_options:[]})
        }
      }

      IsSpotInOptions = (spot) => {
        for (let index = 0; index < this.state.move_options.length; index++) {
          const element = this.state.move_options[index];
          if (element[0] === spot[0] && element[1] === spot[1]) {
            return true
          }
        }
        return false
      }

      render () {
        console.log(this.board)
        return (
<           div className="board">
                {this.board.map(row => row.map(piece => <Block key ={piece.spot} piece = {piece} handlePiece = {this.handlePiece}/>))}
            </div> 
        )
      }  
}
export default Board