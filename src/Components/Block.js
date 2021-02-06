
import React from "react"

const picture  = {'w' : { 'P': "WhitePawn.png",
                         'R': "WhiteRook.png",
                         'B': "WhiteBishop.png",
                        'k': "WhiteKnight.png",
                        'Q': "WhiteQueen.png",
                        'K': "WhiteKing.png" 
                    },
                'b' : { 'P': "BlackPawn.png",
                        'R': "BlackRook.png",
                        'B': "BlackBishop.png",
                        'k': "BlackKnight.png",
                        'Q': "BlackQueen.png",
                        'K': "BlackKing.png"
                    },
                'e': {
                    '0': ""
                }
                
}


class Block extends React.Component {
    constructor (props) {
        super(props) 
        this.piece = props.piece
        this.pic = ".\\Chesspieceses\\" + picture[this.piece.color][this.piece.lett]
        if ((this.piece.spot[0] + this.piece.spot[1]) % 2 === 0 ) {
            this.className = "block white"
        } else {
            this.className = "block black"
        }
    }

    shouldComponentUpdate (nextProps) {
        if (nextProps.piece !== this.props.piece)  {
            this.piece = nextProps.piece
            this.pic = ".\\Chesspieceses\\" + picture[this.piece.color][this.piece.lett]
            return true
        }
        return false
    }

    render () {
        
        return ( 
            <div className={this.className} onClick={() => this.props.handlePiece(this.piece)}>
                <img className="piece" src={this.pic} alt=""></img>
            </div>
        )
    }
}
export default Block

