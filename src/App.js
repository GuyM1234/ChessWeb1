
import React from 'react';
import Board from "./Components/Board"

class App extends React.Component {
  constructor () {
    super()
    this.turn = 'w'
  }

  render () {
    return(
      <Board />
    )
  }
}

export default App;
