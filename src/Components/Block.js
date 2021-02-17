
import React from "react"
import Option from "./Option"

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
        super() 
        this.piece = props.piece
        this.pic = ".\\Chesspieceses\\" + picture[this.piece.color][this.piece.lett]
        if ((this.piece.spot[0] + this.piece.spot[1]) % 2 === 0 ) {
            this.className = "block white"
        } else {
            this.className = "block black"
        }
        this.isOption = false
    }

    shouldComponentUpdate (nextProps) {
        let change = false
        if (nextProps.piece !== this.props.piece)  {
            this.piece = nextProps.piece
            this.pic = ".\\Chesspieceses\\" + picture[this.piece.color][this.piece.lett]
            change = true
        }
        if (nextProps.isOption !== this.props.isOption) {
            this.isOption = nextProps.isOption
            change = true
        }
        return change
    }

    render () {
        return (
            <div className={this.className} onClick={() => this.props.handleClick(this.piece)}>
                <img className="piece" src={this.pic} alt=""></img>
                {this.isOption && <Option draw = {this.isOption}/>}
            </div>
        )
    
        
    }
}
export default Block

