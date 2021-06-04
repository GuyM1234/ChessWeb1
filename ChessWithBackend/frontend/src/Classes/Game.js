import { Piece, Pawn, Rook, Bishop, Queen, King, Knight} from "./pieces"
import SpotInOptions from "./Methods"

import BlackPawn from "../Chesspieceses/BlackPawn.png"
import BlackRook from "../Chesspieceses/BlackRook.png"
import BlackBishop from "../Chesspieceses/BlackBishop.png"
import BlackKnight from "../Chesspieceses/BlackKnight.png"
import BlackQueen from "../Chesspieceses/BlackQueen.png"
import BlackKing from "../Chesspieceses/BlackKing.png"
import WhitePawn from "../Chesspieceses/WhitePawn.png"
import WhiteRook from "../Chesspieceses/WhiteRook.png"
import WhiteBishop from "../Chesspieceses/WhiteBishop.png"
import WhiteKnight from "../Chesspieceses/WhiteKnight.png"
import WhiteQueen from "../Chesspieceses/WhiteQueen.png"
import WhiteKing from "../Chesspieceses/WhiteKing.png"

export class Game {
    constructor() {
        this.turn = 'w'
        this.whiteKing = new King([7,4],'K','w',WhiteKing)
        this.blackKing = new King([0,4],'K','b',BlackKing)
        this.board = this.createBoard()
    }

    createBoard () {
        const board = []
        for (let rowindex = 0; rowindex < 8; rowindex++) {
            const row = []
            for (let columnindex = 0; columnindex < 8; columnindex++) {
                let p = new Piece([rowindex,columnindex],'0','e',"")
                row.push(p);
            }
            board.push(row)
        }
        board[6] = board[6].map((x,index) => new Pawn([6,index],'P','w',WhitePawn))
        board[1] = board[1].map((x,index) => new Pawn([1,index],'P','b',BlackPawn))
        board[7][4] = this.whiteKing
        board[0][4] = this.blackKing
        board[7][3] = new Queen([7,3],'Q','w',WhiteQueen)
        board[0][3] = new Queen([0,3],'Q','b',BlackQueen)
        board[7][0] = new Rook([7,0],'R','w',WhiteRook)
        board[7][7] = new Rook([7,7],'R','w',WhiteRook)
        board[0][0] = new Rook([0,0],'R','b',BlackRook)
        board[0][7] = new Rook([0,7],'R','b',BlackRook)
        board[7][2] = new Bishop([7,2],'B','w',WhiteBishop)
        board[7][5] = new Bishop([7,5],'B','w',WhiteBishop)
        board[0][2] = new Bishop([0,2],'B','b',BlackBishop)
        board[0][5] = new Bishop([0,5],'B','b',BlackBishop)
        board[7][1] = new Knight([7,1],'k','w',WhiteKnight)
        board[7][6] = new Knight([7,6],'k','w',WhiteKnight)
        board[0][1] = new Knight([0,1],'k','b',BlackKnight)
        board[0][6] = new Knight([0,6],'k','b',BlackKnight)
        return board;
    } 
    
    update (chosen_spot, piece) {
        this.board[chosen_spot[0]][chosen_spot[1]] = piece;
        this.board[piece.spot[0]][piece.spot[1]] = new Piece(piece.spot,'0','e');
    }

    updateTurn () {
        if (this.turn === 'w'){
            this.turn = 'b'
        } else{
            this.turn = 'w'
        }
    }

    isCheck () {
        for (let row = 0; row < this.board.length; row++) {
            for (let column = 0; column < this.board[row].length; column++) {
                const piece = this.board[row][column]
                if (piece.lett !== 'K') {
                    const move_options = piece.move_options(this)
                    if (this.turn === 'w') {
                        if (SpotInOptions(this.whiteKing.spot,move_options)) {
                            return true
                    }
                }
                else if (SpotInOptions(this.blackKing.spot,move_options)) {
                    return true
                    }
                }
            }
        }
        return false
    }
    
    isCheckMate() {
        for (let row = 0; row < this.board.length; row++) {
            for (let column = 0; column < this.board[row].length; column++) {
                const piece = this.board[row][column]
                if (piece.color === this.turn) {
                    const move_options = piece.getAvaliableMoves(this)
                    if (move_options.length > 0) {
                        return false
                    }
                }
            }
        }
        return true
    }
    
    isPat() {
        return this.isCheckMate()
    }
    
}

export class Copy_Game extends Game {
    constructor (game) {
        super()
        this.turn = game.turn
        this.board = this.createCopyBoard(game.board)
        this.whiteKing = this.board[game.whiteKing.spot[0]][game.whiteKing.spot[1]]
        this.blackKing = this.board[game.blackKing.spot[0]][game.blackKing.spot[1]]
    }
    
    createCopyBoard (board) {
        const copy_board = []
        for (let rowindex = 0; rowindex < 8; rowindex++) {
            const row = []
            for (let columnindex = 0; columnindex < 8; columnindex++) {
                let p = board[rowindex][columnindex].create_copy()
                row.push(p);
            }
            copy_board.push(row)
        }
        return copy_board
    }
}