
export const get_opp_color= (color) => {
  return color === 'w' ? 'b' : 'w'
}

function SpotInOptions (spot,move_options) {
    for (let index = 0; index < move_options.length; index++) {
      const element = move_options[index];
      if (element[0] === spot[0] && element[1] === spot[1]) {
        return true
      }
    }
    return false
}
export default SpotInOptions