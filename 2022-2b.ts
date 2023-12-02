const shapes = {
  ROCK: "ROCK",
  PAPER: "PAPER",
  SCISSORS: "SCISSORS",
} as const;

const states = {
  VICTORY: "VICTORY",
  DRAW: "DRAW",
  DEFEAT: "DEFEAT",
} as const;

type Shape = keyof typeof shapes;
type State = keyof typeof states;

const input = Deno.readTextFileSync("2022-2.txt");

const rounds = input.split("\n").map((round) => {
  const shapeMap = {
    A: shapes.ROCK,
    B: shapes.PAPER,
    C: shapes.SCISSORS,
  };

  const stateMap = {
    X: states.DEFEAT,
    Y: states.DRAW,
    Z: states.VICTORY,
  };

  const [shape, state] = round.split(" ") as [keyof typeof shapeMap, keyof typeof stateMap];
  return {
    shape: shapeMap[shape],
    state: stateMap[state],
  };
});

const getShapePoints = (shape: Shape, state: State) => {
  const points = {
    [shapes.ROCK]: 1,
    [shapes.PAPER]: 2,
    [shapes.SCISSORS]: 3,
  };

  const beats = {
    [shapes.ROCK]: shapes.SCISSORS,
    [shapes.PAPER]: shapes.ROCK,
    [shapes.SCISSORS]: shapes.PAPER,
  };

  const beatenBy = {
    [shapes.ROCK]: shapes.PAPER,
    [shapes.PAPER]: shapes.SCISSORS,
    [shapes.SCISSORS]: shapes.ROCK,
  };

  if (state === states.DRAW) return points[shape];
  if (state === states.VICTORY) return points[beatenBy[shape]];
  return points[beats[shape]];
};

const getStatePoints = (state: State) =>
  ({
    [states.VICTORY]: 6,
    [states.DRAW]: 3,
    [states.DEFEAT]: 0,
  }[state]);

const out = rounds
  .map(({ shape, state }) => {
    let sum = 0;
    sum += getStatePoints(state);
    sum += getShapePoints(shape, state);
    return sum;
  })
  .reduce((acc, curr) => acc + curr);

console.log(out);
