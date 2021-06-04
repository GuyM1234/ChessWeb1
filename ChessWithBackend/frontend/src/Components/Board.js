import React from "react";
import Block from "./Block"
import SpotInOptions from "../Classes/Methods"


export default function Board ({board,move_options,handleClick}){
  const graphicBoard =  board.map(row => row.map(piece => <Block key={Math.random()* 1000000000000}piece = {piece} handleClick = {handleClick} option = {SpotInOptions(piece.spot,move_options)}/>))
  return (
    <div className="board">
      {graphicBoard}
    </div> 
    )
}