import React from "react";
import Block from "./Block"
import SpotInOptions from "./Methods"

class Board extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          board: this.props.board,
          move_options: this.props.move_options
        }
    }

    render () {
      const graphicBoard =  this.props.board.map(row => row.map(piece => <Block key = {piece.spot} piece = {piece} handleClick = {this.props.handleClick} isOption = {SpotInOptions(piece.spot,this.props.move_options)}/>))
      return (
          <div className="board">
              {graphicBoard}
          </div> 
      )
    }  
}
export default Board