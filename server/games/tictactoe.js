/* Fields
___________ 
| 0 | 1 | 2 |
| 3 | 4 | 5 |
| 6 | 7 | 8 |
|___________|
 */
// x     o
// 1 || -1
let whosTurn = 1
let turnCounter = 1
let winner = undefined

const tictactoeStartingState = () => {
  return {
    board:
      ['', '', '',
        '', '', '',
        '', '', '']
  }
}

const makeMove = (field, board) => {
  board[field] = whosTurn === 1 ? 'x' : 'o'
  gameEnded(board)
  whosTurn *= -1
  return board
}

const gameEnded = (board) => {
  if (turnCounter === 9){
    return true
  }
  for (let i = 0; i < 3; i++) {
    if (board[i] === board[i + 3] && board[i] === board[i + 6])
      return true
    if (board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2])
      return true
  }
  if (board[0] === board[4] && board[0] === board[8])
    return true
  if (board[2] === board[4] && board[2] === board[6])
    return true
  return false
}

const getWinner = () =>{
  return winner
}

module.exports = {
  tictactoeStartingState,
  tictactoeMakeMove: makeMove
}
