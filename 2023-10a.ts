const map = Deno.readTextFileSync("2023-10.txt")
  .split("\n")
  .map((line) => line.split(""));

type Point = { x: number; y: number };

const getFirstConnected = (point: Point): Point => {
  // up
  if (point.y > 0 && ["7", "|", "F"].includes(map[point.y - 1][point.x])) {
    return { x: point.x, y: point.y - 1 };
  }
  // right
  if (point.x < map[point.y].length - 1 && ["-", "J", "7"].includes(map[point.y][point.x + 1])) {
    return { x: point.x + 1, y: point.y };
  }
  // down
  if (point.y < map.length - 1 && ["|", "J", "L"].includes(map[point.y + 1][point.x])) {
    return { x: point.x, y: point.y + 1 };
  }
  // left
  return { x: point.x - 1, y: point.y };
};

const startY = map.findIndex((line) => line.includes("S"));
const startX = map[startY].indexOf("S");

const startPoint = { x: startX, y: startY };
const connected = getFirstConnected(startPoint);

// cant do simple recursion because of stack overflows
let nextArgs = {
  point: connected,
  from: startPoint,
  steps: 0,
};

const follow = () => {
  const { point, from, steps } = nextArgs!;
  console.log(`${map[point.y][point.x]} ${point.x},${point.y} ignore: ${from.x},${from.y} steps: ${steps}`);
  const currentSymbol = map[point.y][point.x];
  switch (currentSymbol) {
    case "S": {
      console.log(Math.floor((steps + 1) / 2));
      Deno.exit();
    }
    case "|": {
      nextArgs = { point: { x: point.x, y: 2 * point.y - from.y }, from: point, steps: steps + 1 };
      return;
    }
    case "-": {
      nextArgs = { point: { x: 2 * point.x - from.x, y: point.y }, from: point, steps: steps + 1 };
      return;
    }
    case "L": {
      const next = from.y < point.y ? { x: point.x + 1, y: point.y } : { x: point.x, y: point.y - 1 };
      nextArgs = { point: next, from: point, steps: steps + 1 };
      return;
    }
    case "J": {
      const next = from.y < point.y ? { x: point.x - 1, y: point.y } : { x: point.x, y: point.y - 1 };
      nextArgs = { point: next, from: point, steps: steps + 1 };
      return;
    }
    case "7": {
      const next = from.x < point.x ? { x: point.x, y: point.y + 1 } : { x: point.x - 1, y: point.y };
      nextArgs = { point: next, from: point, steps: steps + 1 };
      return;
    }
    case "F": {
      const next = from.x > point.x ? { x: point.x, y: point.y + 1 } : { x: point.x + 1, y: point.y };
      nextArgs = { point: next, from: point, steps: steps + 1 };
      return;
    }
    default:
      throw new Error("unrecognized symbol");
  }
};

while (true) {
  follow();
}
