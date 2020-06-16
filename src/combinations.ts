import R from 'ramda'

export const throwDice = () => Math.floor((Math.random() * 5) + 1)

export const yatzyScore = (yatzyThrow: number[]) => (
  yatzyThrow.every(dice => dice === yatzyThrow[0]) ? 50 : 0
)

export const numberScore = (numberToScore: number) => (yatzyThrow: number[]) => (
  yatzyThrow.filter(die => die === numberToScore).reduce((acc, dieWithNumber) =>  acc + dieWithNumber, 0)
)

export const containsNumbersInThrow = (throwContains: number[]) => (yatzyThrow: number[]) => {
  const sortedThrow = yatzyThrow.sort()
  const sortedContains = throwContains.sort()

  return sortedThrow.every((die, i) => {
    return die === sortedContains[i]
  })
}

export const lowStraitScore = (yatzyThrow: number[]) => (
  containsNumbersInThrow([1,2,3,4,5])(yatzyThrow) ? 15 : 0
)

export const highStraitScore = (yatzyThrow: number[]) => (
  containsNumbersInThrow([2,3,4,5,6])(yatzyThrow) ? 20 : 0
)

export const isFullHouse = (yatzyThrow: number[]) => {
  const counts: {[key: string]: number} = R.countBy(R.identity, yatzyThrow)
  const onlyTwoNumbers = Object.keys(counts).length === 2
  const moreThenOneNumberInEveryBucket = Object.values(counts).filter((count: number)=> count >= 2).length === 2
  return onlyTwoNumbers && moreThenOneNumberInEveryBucket
}

export const fullHouseScore = (yatzyThrow: number[]) => (
  isFullHouse(yatzyThrow) ? yatzyThrow.reduce((acc, next) => acc+next, 0) : 0
)

export const nOfAKind = (noOf: number) => (yatzyThrow: number[]) => (
  R.pipe(
    R.countBy(R.identity),
    R.filter((count: number) => count >= noOf),
    R.keys(),
    R.map(parseInt),
    R.head,
  )(yatzyThrow)
)

export const threeOfAkindScore = (yatzyThrow: number[]) => {
  const numberOfACount = 3
  const ofAKind = nOfAKind(numberOfACount)(yatzyThrow)
  return ofAKind ? ofAKind * numberOfACount : 0
}

export const fourOfAKindScore = (yatzyThrow: number[]) => {
  const numberOfACount = 4
  const ofAKind = nOfAKind(numberOfACount)(yatzyThrow)
  return ofAKind ? ofAKind * numberOfACount : 0
}
