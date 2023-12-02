const shapes = {
  ROCK: "ROCK",
  PAPER: "PAPER",
  SCISSORS: "SCISSORS",
} as const;

type Shape = keyof typeof shapes;

const theyShapes = {
  A: shapes.ROCK,
  B: shapes.PAPER,
  C: shapes.SCISSORS,
};

const usShapes = {
  X: shapes.ROCK,
  Y: shapes.PAPER,
  Z: shapes.SCISSORS,
};

const points = {
  [shapes.ROCK]: 1,
  [shapes.PAPER]: 2,
  [shapes.SCISSORS]: 3,
};

const getVictoryScore = (they: Shape, us: Shape): number => {
  if (they === us) return 3;
  if (they === shapes.ROCK && us === shapes.PAPER) return 6;
  if (they === shapes.ROCK && us === shapes.SCISSORS) return 0;

  if (they === shapes.PAPER && us === shapes.SCISSORS) return 6;
  if (they === shapes.PAPER && us === shapes.ROCK) return 0;

  if (they === shapes.SCISSORS && us === shapes.ROCK) return 6;
  return 0;
};

const getRoundScore = (they: Shape, us: Shape) => {
  let sum = 0;
  sum += points[us];
  sum += getVictoryScore(they, us);
  return sum;
};

const input = Deno.readTextFileSync("2022-2.txt");

const rounds = input.split("\n").map((round) => {
  const [they, us] = round.split(" ") as [keyof typeof theyShapes, keyof typeof usShapes];
  return {
    they: theyShapes[they],
    us: usShapes[us],
  };
});

const out = rounds.map(({ they, us }) => getRoundScore(they, us)).reduce((acc, curr) => acc + curr);

console.log(out);
