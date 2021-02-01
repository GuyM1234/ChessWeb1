
import React from "react"

const Block = (props) => {
    const piece = props.piece
    const src = ".\\Chesspieceses\\" + piece.img
    let className
    if ((piece.spot[0] + piece.spot[1]) % 2 === 0 ){
        className = "block white"
    }else{
        className = "block black"
    }
    
    return (
        <div className={className} oncick = {() => props.handlePiece(piece)}>
            <img className="piece" src={src} alt=""></img>
        </div>
    )
}

export default Block

