
import React from "react"
import Block from "./Block"

function BlocksRow(props) {
    let row = [0,0,0,0,0,0,0,0]
    row = row.map((x,index) => <Block piece = {props.board_row[index]} handlePiece = {props.handlePiece}/>)
    return (
        <tr>
            {row}
        </tr>
    )
}

export default BlocksRow