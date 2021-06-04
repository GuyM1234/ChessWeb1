import React from "react"
import Option from "./Option"

export default function Block({piece, handleClick, option}){
    return(
        <div className={((piece.spot[0] + piece.spot[1]) % 2 === 0 )?"block white":"block black"} onClick={() => handleClick(piece.spot)}>
            <img className="piece" src={piece.pic} alt=""></img>
            {option && <Option draw = {option}/>}
        </div>

    )
}

