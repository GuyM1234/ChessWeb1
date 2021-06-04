
import {useState, React} from 'react';
import Board from "./Board"
import { Game } from "../Classes/Game";
import SpotInOptions from "../Classes/Methods"
import Timer from "./Timer"

// class App extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       piece: null,
//       game: new Game(),
//       move_options: [],
//       status: "",

//     }
//   }

//   handleClick = (piece) => {
//     console.log("hi")
//     const row = piece.spot[0]
//     const column = piece.spot[1]
//     this.setState(prevState => {
//       if (this.state.piece == null) {
//         if (this.state.game.turn === piece.color) {
//           const move_options = piece.getAvaliableMoves(prevState.game)
//           if (move_options.length > 0) { 
//             return {piece: piece, move_options: move_options}
//           }
//         }
//       }
//       else{
        
//         if (SpotInOptions(piece.spot, this.state.move_options)) {
//           prevState.game.board[prevState.piece.spot[0]][prevState.piece.spot[1]].move([row,column],this.state.game)
//           prevState.game.updateTurn()
//         }
//         return {piece: null, game: prevState.game, move_options: [], status: this.updateStatus(prevState.game)}
//       }
//     })
//   }

//   updateStatus = () => {
//     if (this.state.game.isCheck()) {
//       if (this.state.game.isCheckMate()) {
//         return "CHECKMATE!"
//       }
//       else{
//         return "CHECK!"
//       }
//     }
//     else if (this.state.game.isPat()){
//       return "PAT!"
//     }
//     else{
//       return " "
//     }
//   }

//   render () {
//     return(
//       <div className="game">
//         <h1 className="status">{this.state.status}</h1>
//         <Board board = {this.state.game.board} move_options = {this.state.move_options} handleClick = {this.handleClick}/>
//         <div className="timers">
//           <Timer color = 'b' turn = {this.state.game.turn}/>
//           <Timer color = 'w' turn = {this.state.game.turn}/>
//         </div>
//       </div>
     
//     )
//   }
// }
// export default App;

export default function App() {
  const [game, setGame] = useState(new Game())
  const [piece, setPiece] = useState()
  const [moveOptions,setMoveOptions] = useState([])
  const [status, setStatus] = useState(" ")

  const handleClick = (spot) => {
    const row = spot[0]
    const column = spot[1]
    if (piece == null) {
      const chosenPiece = game.board[row][column]
      if (game.turn === chosenPiece.color) {
        const move_options = chosenPiece.getAvaliableMoves(game)
        if (move_options.length > 0) { 
          setPiece(chosenPiece)
          setMoveOptions(move_options)
        }
      }
    }
    else{
      if (SpotInOptions(spot, moveOptions)) {
        game.board[piece.spot[0]][piece.spot[1]].move([row,column],game)
        game.updateTurn()
      }
      setGame(game)
      setPiece(null)
      setMoveOptions([])
    }
    updateStatus()
  }

  const updateStatus = () => {
    if (game.isCheck()) {
      if (game.isCheckMate()) {
        setStatus("CHECKMATE!")
      }
      else{
        setStatus("CHECK!")
      }
    }
    else if (game.isPat()){
      setStatus("PAT")
    }
    else{
      setStatus(" ")
    }
  }
    return(
       <div className="game">
          <h1 className="status">{status}</h1>
          <Board board = {game.board} move_options = {moveOptions} handleClick = {handleClick}/>
          <div className="timers">
            <Timer color = 'b' turn = {game.turn}/>
            <Timer color = 'w' turn = {game.turn}/>
          </div>
          <h1>HI</h1>
       </div>
    )
}


