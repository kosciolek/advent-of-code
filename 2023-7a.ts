const CARD_VALUES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

type Card = keyof typeof CARD_VALUES;

const HAND_TYPES = {
  FIVE_OF_A_KIND: 6, // 5 times the same card
  FOUR_OF_A_KIND: 5, // 4 times the same card
  FULL_HOUSE: 4, // 3 times the same card + 1 pair
  THREE_OF_A_KIND: 3, // 3 times the same card
  TWO_PAIR: 2, // 2 pairs
  ONE_PAIR: 1, // one pair
  HIGH_CARD: 0, // all different
};

const getHandType = (hand: number[]) => {
  const counter = new Map<number, number>();
  for (const card of hand) {
    const existingValue = counter.get(card);
    if (existingValue !== undefined) {
      counter.set(card, existingValue + 1);
    } else {
      counter.set(card, 1);
    }
  }
  const values = [...counter.values()];
  if (values.includes(5)) {
    return HAND_TYPES.FIVE_OF_A_KIND;
  }
  if (values.includes(4)) {
    return HAND_TYPES.FOUR_OF_A_KIND;
  }
  if (values.includes(3)) {
    if (values.includes(2)) {
      return HAND_TYPES.FULL_HOUSE;
    }
    return HAND_TYPES.THREE_OF_A_KIND;
  }
  const pairs = values.filter((x) => x === 2).length;
  if (pairs === 2) {
    return HAND_TYPES.TWO_PAIR;
  }
  if (pairs === 1) {
    return HAND_TYPES.ONE_PAIR;
  }
  return HAND_TYPES.HIGH_CARD;
};

const input = Deno.readTextFileSync("2023-7.txt")
  .split("\n")
  .map((line) => {
    const [hand, bid] = line.split(" ");
    return { hand: hand.split("").map((char) => CARD_VALUES[char as Card]), bid: Number(bid) };
  });

const sorted = [...input].sort((a, b) => {
  const typeA = getHandType(a.hand);
  const typeB = getHandType(b.hand);
  if (typeA !== typeB) {
    return typeA - typeB;
  }

  if (a.hand.length !== b.hand.length) {
    throw new Error("Invariant broken: both hands are assumed to have the same amount of cards");
  }
  for (let i = 0; i < a.hand.length; i += 1) {
    const aDigit = a.hand[i];
    const bDigit = b.hand[i];
    if (aDigit !== bDigit) {
      return aDigit - bDigit;
    }
  }
  return 0;
});

const answer = sorted.map(({ bid }, index) => bid * (index + 1)).reduce((sum, v) => sum + v);

console.log(answer);
