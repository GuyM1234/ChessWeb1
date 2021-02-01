import { Piece , Pawn, Rook,Bishop} from "./pieces"


class GameBoard {
    constructor() {
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
        board[6] = board[6].map((x,index) => new Pawn([6,index],'P','w',"WhitePawn.png"))
        board[1] = board[1].map((x,index) => new Pawn([1,index],'P','b',"BlackPawn.png"))
        
        // board_imgs[7][4] = "WhiteKing.png"
        // board_imgs[7][3] = "WhiteQueen.png"
        // board_imgs[7][0] = "WhiteRook.png"
        // board_imgs[7][7] = "WhiteRook.png"
        // board_imgs[7][2] = "WhiteBishop.png"
        // board_imgs[7][5] = "WhiteBishop.png"
        // board_imgs[7][1] = "WhiteKnight.png"
        // board_imgs[7][6] = "WhiteKnight.png"

        // board_imgs[0][4] = "BlackKing.png"
        // board_imgs[0][3] = "BlackQueen.png"
        // board_imgs[0][0] = "BlackRook.png"
        // board_imgs[0][7] = "BlackRook.png"
        // board_imgs[0][2] = "BlackBishop.png"
        // board_imgs[0][5] = "BlackBishop.png"
        // board_imgs[0][1] = "BlackKnight.png"
        // board_imgs[0][6] = "BlackKnight.png"

        board[7][0] = new Rook([7,0],'R','w',"WhiteRook.png")
        board[7][7] = new Rook([7,7],'R','w',"WhiteRook.png")
        board[0][0] = new Rook([0,0],'R','b',"BlackRook.png")
        board[0][7] = new Rook([0,7],'R','b',"BlackRook.png")
        board[7][2] = new Bishop([7,2],'B','w',"WhiteBishop.png")
        board[7][5] = new Bishop([7,5],'B','w',"WhiteBishop.png")
        board[0][2] = new Bishop([0,2],'B','B',"BlackBishop.png")
        board[0][5] = new Bishop([0,5],'B','B',"BlackBishop.png")

        return board;
    } 
    
    update (chosen_spot, piece) {
        this.board[chosen_spot[0]][chosen_spot[1]] = piece;
        this.board[piece.spot[0]][piece.spot[1]] = new Piece(piece.spot,'0','e');
    }
}

export default GameBoard