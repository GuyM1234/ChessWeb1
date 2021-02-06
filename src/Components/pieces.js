
export class Piece {
    constructor (spot,lett,color){
        this.spot = spot
        this.lett = lett
        this.color = color
        this.moved = false
    }

    move_options () {
        return []
    }

    move (chosen_spot,game_board){
        game_board.update(chosen_spot,this)
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
        return typeof(this)(this.spot,this.lett,this.color)
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
    move_options(board) {
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
}


export class Rook extends Piece{
    move_options(board){
        const option_list = [];
        this.check_dir(1,0,board,option_list)
        this.check_dir(-1,0,board,option_list)
        this.check_dir(0,1,board,option_list)
        this.check_dir(0,-1,board,option_list)
        return option_list
    }
}
export class Bishop extends Piece{
    move_options(board){
        const option_list = [];
        this.check_dir(1,1,board,option_list)
        this.check_dir(-1,-1,board,option_list)
        this.check_dir(-1,1,board,option_list)
        this.check_dir(1,-1,board,option_list)
        return option_list
    }
}

const get_opp_color= (color) => {
    if (color === "w") {
        return 'b'
    }
    else{
        return 'w'
    }
}

export class Queen extends Piece {
    move_options(board) {
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
}

export class King extends Piece {
    
}