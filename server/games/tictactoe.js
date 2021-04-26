/* Fields
___________ 
| 0 | 1 | 2 |
| 3 | 4 | 5 |
| 6 | 7 | 8 |
|___________|
 */


const tictactoeStartingState = () => {
  return ['', '', '',
        '', '', '',
        '', '', '']
}

const tictactoeMaxPlayers = 2

const turnCounter = (board) => {
  return board.filter(field => field).length
}

const makeMove = (field, board) => {
  const currentTurn = turnCounter(board)
  if (!board[field])
    board[field] = currentTurn % 2 === 0 ? 'x' : 'o'
  const whoWon = gameEnded(board, currentTurn)
  return {
    boardAfterMove: board,
    whoWon,
  }
}



const gameEnded = (board, currentTurn) => {
  if (currentTurn === 8){
    return 'd'
  }
  for (let i = 0; i < 3; i++) {
    if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6])
      return board[i]
    if (board[i*3] && board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2])
      return board[i*3]
  }
  if (board[0] && board[0] === board[4] && board[0] === board[8])
    return board[0]
  if (board[2] && board[2] === board[4] && board[2] === board[6])
    return board[2]
  return false
}


module.exports = {
  tictactoeStartingState,
  tictactoeMakeMove: makeMove,
  tictactoeMaxPlayers,
}
