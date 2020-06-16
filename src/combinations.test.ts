import {
throwDice,
yatzyScore,
numberScore,
containsNumbersInThrow,
lowStraitScore,
highStraitScore,
isFullHouse,
fullHouseScore,
threeOfAkindScore,
fourOfAKindScore,
} from './combinations'

test('throwDice should return number between 1 and 6', () => {
const result = throwDice()
  expect(result).toBeLessThanOrEqual(6)
  expect(result).toBeGreaterThanOrEqual(1)
})

test('isYatzy is yatzy!', () => {
  const yatzyThrow = [1,1,1,1,1]
  expect(yatzyScore(yatzyThrow)).toBe(50)
})

test('isYatzy is not yatzy!', () => {
  const yatzyThrow = [1,1,1,1,3]
  expect(yatzyScore(yatzyThrow)).toBe(0)
})

test('score amout of 1s thrown', () => {
  const yatzyThrow = [1,1,1,2,3]
  expect(numberScore(1)(yatzyThrow)).toBe(3)
})

test('score amout of 3s thrown', () => {
  const yatzyThrow = [3,1,1,2,3]
  expect(numberScore(3)(yatzyThrow)).toBe(6)
})

test('is not a low strait', () => {
  const yatzyThrow = [2,1,3,5,5]
expect(containsNumbersInThrow([1,2,3,4,5])(yatzyThrow)).toBe(false)
})

test('is a low strait', () => {
  const yatzyThrow = [2,1,3,5,4]
  expect(containsNumbersInThrow([1,2,3,4,5])(yatzyThrow)).toBe(true)
})

test('highStraitScore of 20', () => {
  const yatzyThrow = [2,6,3,5,4]
  expect(highStraitScore(yatzyThrow)).toBe(20)
})

test('lowStraitScore of 15', () => {
  const yatzyThrow = [2,1,3,5,4]
  expect(lowStraitScore(yatzyThrow)).toBe(15)
})

test('is not a full house', () => {
  const yatzyThrow = [1,1,1,1,3]
  expect(isFullHouse(yatzyThrow)).toBe(false)
})

test('is a full house', () => {
  const yatzyThrow = [2,1,1,1,2]
  expect(isFullHouse(yatzyThrow)).toBe(true)
})

test('full house score', () => {
  const yatzyThrow = [1,1,1,5,5]
  expect(fullHouseScore(yatzyThrow)).toBe(13)
})

test('full house score', () => {
  const yatzyThrow = [1,1,2,5,5]
  expect(fullHouseScore(yatzyThrow)).toBe(0)
})

test('has 3 of a kind score', () => {
  const yatzyThrow = [1,1,1,4,2]
  expect(threeOfAkindScore(yatzyThrow)).toBe(3)
})

test('has no 3 of a kind score', () => {
  const yatzyThrow = [1,1,2,4,2]
  expect(threeOfAkindScore(yatzyThrow)).toBe(0)
})

test('has 4 of a kind score', () => {
  const yatzyThrow = [1,1,1,1,2]
  expect(fourOfAKindScore(yatzyThrow)).toBe(4)
})
