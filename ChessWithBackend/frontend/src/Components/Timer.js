import React from "react"



class Timer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            color: props.color,
            time: 900
        }
    }
    componentDidMount(){
        if (this.props.turn === 'b') {
            this.startClock()
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.turn !== this.props.turn) {
            if (this.props.turn === this.state.color) {
                this.startClock()
            }
            else{
                this.stopClock()
            }
        }
    }

    startClock = () => {
        this.myInterval = setInterval(() => {
            this.setState(prevState => {
                if (prevState.time === 1) {
                    this.stopClock()
                    return {time: prevState.time - 1, lost: true}
                }
                return {time: prevState.time - 1}
            })
        }, 1000)
    }

    stopClock = () => {
        clearInterval(this.myInterval)
    }
    
    formatTimer = () =>{
        let time = ""
        const minutes = Math.floor(this.state.time / 60)
        const seconds = this.state.time % 60
        if (minutes < 10) {
            time += "0" + minutes + ":"
        }
        else {
            time += minutes + ":"
        }
        if (seconds < 10) {
            time += "0" + seconds
        }
        else {
            time += seconds
        }
        return time
    }

    render () {
        return (
            <div className="timer">{this.formatTimer()}</div>
        )
    }
}

export default Timer