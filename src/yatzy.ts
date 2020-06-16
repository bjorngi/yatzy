import { throwDice, numberScore, lowStraitScore, highStraitScore, yatzyScore, fullHouseScore } from './combinations'
import R from 'ramda'

type Scoreboard = {
  [key: string]: number
}

type ScoreFunction = (yatzyThrow: number[]) => number

type ScoreFunctions = {
  [key: string]: ScoreFunction
}

const potentialScore = ({
  '1': 5,
  '2': 10,
  '3': 15,
  '4': 20,
  '5': 25,
  '6': 30,
  'low strait': 15,
  'high strait': 20,
  'yatzy': 50,
  'full house': 28,
  'chance': 30,
})


const scoreFunctions: ScoreFunctions = ({
  '1': numberScore(1),
  '2': numberScore(2),
  '3': numberScore(3),
  '4': numberScore(4),
  '5': numberScore(5),
  '6': numberScore(6),
  'low strait': lowStraitScore,
  'high strait': highStraitScore,
  'yatzy': yatzyScore,
  'full house': fullHouseScore,
  'chance': (yatzyThrow) => yatzyThrow.reduce((acc, die) => acc+die, 0)
})


const throw5dice = () => R.range(0,5).map(throwDice)

const calculateResultsInThrow = (yatzyThrow: number[], scoreFunctions: ScoreFunctions, scoreBoard: Scoreboard): {[key: string]: number} => {
  const usedScores = R.keys(scoreBoard)
  const filteredScoresOverBoard = R.omit(usedScores)(scoreFunctions)
  const results = R.mapObjIndexed((func: ScoreFunction) => func(yatzyThrow))(filteredScoresOverBoard)
  return results
}

const calculateBestResult = (resultsInThrow: Scoreboard) => Object.entries(resultsInThrow).reduce((acc, [key, value]) => {
  const weight = value/potentialScore[key]

  if(acc === undefined) {
    return [key, {
      score: value,
      weight: weight
    }]
  } else if (acc.weight < weight) {
    return [key, {
      score: value,
      weight: weight
    }]
  } else {
    return acc
  }
}, undefined)


const addToScoreboard = (scoreBoard: Scoreboard, bestResult: any) => ({
  ...scoreBoard,
  ...R.fromPairs([bestResult])
})

const numberOfTries = Object.keys(scoreFunctions).length
const playRound = (scoreBoard: Scoreboard = {}, tryNumber = 0): Scoreboard => {
    if(tryNumber === numberOfTries) {
      return scoreBoard
    }

    const yatzyThrow = throw5dice()
    const resultsInThrow = calculateResultsInThrow(yatzyThrow, scoreFunctions, scoreBoard)
    const bestResult = calculateBestResult(resultsInThrow)
    const newScoreBoard = addToScoreboard(scoreBoard, [bestResult[0], bestResult[1].score])

    return playRound(newScoreBoard, tryNumber + 1)
}

const calculateScore = (scorecard: Scoreboard) => (
  Object.values(scorecard).reduce((acc, next) => acc+next, 0)
)

const player1scorecard = playRound()
console.log('Player one scorecard:\n:', player1scorecard)
console.log('Player one SUM:\n:', calculateScore(player1scorecard))
