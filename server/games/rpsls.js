const rpslsStartingState = (userNumber) => {
  return new Array(userNumber).fill(false)
}


const rpslsMakeMove = (secret, player, choice, gameState) => {
  secret.push({
    player,
    choice
  })
  for (let i = 0; i < gameState.length; i++) {
    if (!gameState[i]) {
      gameState[i] = true
      break
    }
  }
  return gameState
}

const getPoints = (choice, otherChoices) => {
  let winning = []
  switch (choice) {
    case 'paper':
      winning = ['spock', 'rock']
      break;
    case 'scissors':
      winning = ['paper', 'lizard']
      break;
    case 'rock':
      winning = ['lizard', 'scissors']
      break;
    case 'spock':
      winning = ['rock', 'scissors']
      break;
    case 'lizard':
      winning = ['paper', 'spock']
      break;
  }
  let points = 0
  points += otherChoices.filter(choice => choice == winning[0] || choice == winning[1]).length
  return points
}


const calculateResults = (result) => {
  const points = result.map(point => {
    return point.points
  })
  const isDraw = [...new Set(points)].length === 1

  const players = result.map(player => {
    return {
      player: player.player,
      points: player.points,
      result: undefined
    }
  })
  if (isDraw) {
    const finalResult = players.map(player => {
      return {
        player: player.player,
        result: 'Draw'
      }
    })
    return finalResult;
  } else {
    let highestScore = -1
    for (const player of players) {
      if (player.points > highestScore) {
        highestScore = player.points
      }
    }
    const finalResult = players.map(player => {
      return {
        player: player.player,
        result: player.points === highestScore ? 'Win' : 'Lost'
      }
    })
    return finalResult;
  }

}

const rpslsGetWinner = (secret) => {
  const choices = secret.map(choice => {
    return choice.choice
  })
  const result = secret.map(player => {
    return {
      player: player.player,
      points: getPoints(player.choice, choices)
    }
  })

  return calculateResults(result)
}


module.exports = {
  rpslsMinPlayers: 2,
  rpslsMaxPlayers: 4,
  rpslsStartingState,
  rpslsMakeMove,
  rpslsGetWinner,
}