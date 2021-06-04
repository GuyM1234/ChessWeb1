import { get_opp_color } from "./Methods";
import {Copy_Game} from "./Game"


export class Piece {
    constructor (spot,lett,color,pic){
        this.spot = spot
        this.lett = lett
        this.color = color
        this.moved = false
        this.pic = pic
    }

    move_options() {
        return []
    }

    getAvaliableMoves(game) {
        const move_options = this.move_options(game)
        let newMoveOptions = []
        for (let index = 0; index < move_options.length; index++) {
            const option = move_options[index];
            const copyGame = new Copy_Game(game)
            copyGame.board[this.spot[0]][this.spot[1]].move(option,copyGame)
            if (!copyGame.isCheck()) {
                newMoveOptions.push(option)
            }
        }
        return newMoveOptions
    }

    move (chosen_spot,game){
        game.update(chosen_spot,this)
        this.spot = chosen_spot
        if (!this.moved) {
            this.moved = true
        }
    }
    
    check_dir (rowDir,columnDir,board,option_list) {
        let row = this.spot[0]
        let column = this.spot[1]
        let blocked = false
        while (!blocked) {
            row += rowDir
            column += columnDir
            if (!this.is_spot_free(row ,column, board, option_list)){
                blocked = true;
                this.is_spot_eatable(row, column, board, option_list);
            }
        }
    }

    create_copy () {
        return new Piece(this.spot,this.lett,this.color)
    }
    
    is_spot_free(row,column,board,move_option) {
        try {
            if (board[row][column].color === "e"){
                move_option.push([row,column])
                return true;
            }
            else{
                return false;
            }
        }
        catch {}
    }

    is_spot_eatable(row,column,board,move_option) {
        try{
            if (board[row][column].color === get_opp_color(this.color)){
                move_option.push([row,column])
            }
        }
        catch {}
    }
}

export class Pawn extends Piece{
    move (chosen_spot,game) {
        super.move(chosen_spot,game)
        if (this.spot[0] === 0 || this.spot[0] === 7) {
            game.board[this.spot[0]][this.spot[1]] = new Queen(this.spot,'Q',this.color)
        }
    }

    move_options(game) {
        const board = game.board
        const row = this.spot[0]
        const column = this.spot[1]
        const move_options = []
        if  (this.color === "w"){
            this.is_spot_free(row - 1, column,board,move_options)
            if (!this.moved){
                this.is_spot_free(row - 2,column,board,move_options)
            } 
            this.is_spot_eatable(row - 1, column + 1,board,move_options)
            this.is_spot_eatable(row - 1, column - 1,board,move_options)
        }
        else {
            this.is_spot_free(row + 1, column,board,move_options)
            if (!this.moved){
                this.is_spot_free(row + 2,column,board,move_options)
            }
            this.is_spot_eatable(row + 1, column + 1,board,move_options)
            this.is_spot_eatable(row + 1, column - 1,board,move_options)
        }
        return move_options;
    }

    create_copy () {
        return new Pawn(this.spot,this.lett,this.color)
    }
}

export class Rook extends Piece{
    move_options(game) {
        const board = game.board
        const option_list = [];
        this.check_dir(1,0,board,option_list)
        this.check_dir(-1,0,board,option_list)
        this.check_dir(0,1,board,option_list)
        this.check_dir(0,-1,board,option_list)
        return option_list
    }
    create_copy () {
        return new Rook(this.spot,this.lett,this.color)
    }
}

export class Bishop extends Piece{
    move_options(game) {
        const board = game.board
        const option_list = [];
        this.check_dir(1,1,board,option_list)
        this.check_dir(-1,-1,board,option_list)
        this.check_dir(-1,1,board,option_list)
        this.check_dir(1,-1,board,option_list)
        return option_list
    }
    create_copy () {
        return new Bishop(this.spot,this.lett,this.color)
    }
}

export class Queen extends Piece {
    move_options(game) {
        const board = game.board
        let option_list = []
        this.check_dir(1,0,board,option_list)
        this.check_dir(-1,0,board,option_list)
        this.check_dir(0,1,board,option_list)
        this.check_dir(0,-1,board,option_list)
        this.check_dir(1,1,board,option_list)
        this.check_dir(-1,-1,board,option_list)
        this.check_dir(-1,1,board,option_list)
        this.check_dir(1,-1,board,option_list)
        return option_list
    }
    create_copy () {
        return new Queen(this.spot,this.lett,this.color)
    }
}

export class King extends Piece {
    move (chosen_spot,game) {
        if (!this.moved) {
            if (chosen_spot[1] === 2) {
                game.board[this.spot[0]][0].move([this.spot[0],3],game)
            }
            if (chosen_spot[1] === 6) {
                game.board[this.spot[0]][7].move([this.spot[0],5],game)
            }
        }
        super.move(chosen_spot,game)
    }

    move_options(game) {
        const board = game.board
        const option_list = []
        const row = this.spot[0]
        const column = this.spot[1]
        const options = [[row + 1,column],[row + 1,column + 1],
        [row,column + 1],[row - 1,column + 1],[row - 1,column],
        [row -1 ,column -1],[row,column - 1],[row + 1,column -1]]

        let option
        for (let index = 0; index < options.length; index++) {
            option = options[index]
            if (!this.is_spot_free(option[0],option[1],board,option_list)){
                this.is_spot_eatable(option[0],option[1],board,option_list)
            }
        }
        
        const route1 = [[this.spot[0],3],[this.spot[0],2],[this.spot[0],1]]
        const route2 = [[this.spot[0],5],[this.spot[0],6]]
        try{
            if (this.castle(game,route1, game.board[this.spot[0]][0])) {
                option_list.push([this.spot[0],2])
            }
            if (this.castle(game,route2, game.board[this.spot[0]][7])) {
                option_list.push([this.spot[0],6])
            }
        }
        catch{}
        return option_list
    }

    castle (game,route,rook) {
        if (!this.moved && !rook.moved) {
            for (let i = 0; i < route.length; i++) {
                const square = route[i];
                if (game.board[square[0]][square[1]].color !== 'e') {
                    return false
                }
                const copyGame = new Copy_Game(game)
                copyGame.board[this.spot[0]][this.spot[1]].move(square,copyGame)
                if (copyGame.isCheck()) {
                    return false
                }
            }
        }
        else {
            return false
        } 
        return true
    }

    create_copy () {
        return new King(this.spot,this.lett,this.color)
    }
}

export class Knight extends Piece {
    move_options(game) {
        const board = game.board
        const option_list = []
        const row = this.spot[0]
        const column = this.spot[1]

        const options = [[row + 2,column + 1],[row + 2,column - 1],
        [row - 1,column + 2],[row - 2,column + 1],[row - 2,column - 1],
        [row + 1 ,column + 2],[row + 1,column - 2],[row - 1,column -2]]
        let option
        for (let index = 0; index < options.length; index++) {
            option = options[index]
            if (!this.is_spot_free(option[0],option[1],board,option_list)){
                this.is_spot_eatable(option[0],option[1],board,option_list)
            }
        }
        return option_list
    }

    create_copy () {
        return new Knight(this.spot,this.lett,this.color)
    }
}