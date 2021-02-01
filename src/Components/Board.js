import React from "react";
import Block from "./Block"


const Board = (props) => {
    console.log(props.handlePiece)
    const board = props.board.map(row => row.map(piece => <Block piece = {piece} handlePiece = {props.handlePiece}/>))
    return (
        <div className="board">
            {board}
        </div>  
    )
}

export default Board