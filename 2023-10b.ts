// this is the solution i came up with myself
// 1. flood fill the loop,
// 2. flood fill the outside,
// 3. count non-filled points at even coordinates
// the code's dirty but i'm too lazy to refactor
const map = Deno.readTextFileSync("2023-10.txt")
  .split("\n")
  .map((line) => line.split(""))
  .flatMap((line) => {
    const thisLine: string[] = [];
    const nextLine: string[] = [];
    for (const char of line) {
      if (char === "|") {
        thisLine.push("|", ".");
        nextLine.push("|", ".");
      } else if (char === "-") {
        thisLine.push("-", "-");
        nextLine.push(".", ".");
      } else if (char === "L") {
        thisLine.push("L", "-");
        nextLine.push(".", ".");
      } else if (char === "J") {
        thisLine.push("J", ".");
        nextLine.push(".", ".");
      } else if (char === "7") {
        thisLine.push("7", ".");
        nextLine.push("|", ".");
      } else if (char === "F") {
        thisLine.push("F", "-");
        nextLine.push("|", ".");
      } else if (char === ".") {
        thisLine.push(".", ".");
        nextLine.push(".", ".");
      } else if (char === "S") {
        thisLine.push("S", "-");
        nextLine.push("|", ".");
      }
    }
    return [thisLine, nextLine];
  });

type Point = { x: number; y: number };

const getWhereToGoFromStart = (point: Point): Point => {
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
const connected = getWhereToGoFromStart(startPoint);

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
  map[point.y][point.x] = "8";
  switch (currentSymbol) {
    // deno-lint-ignore no-fallthrough
    case "S": {
      console.log(Math.floor((steps + 1) / 2));
      const outside = new Set<string>();
      const outsideQueue: Point[] = [];
      // up
      for (let x = 0; x < map[0].length; x += 1) {
        outsideQueue.push({ x, y: 0 }); // todo
      }
      //right
      for (let y = 0; y < map.length; y += 1) {
        outsideQueue.push({ x: 0, y: y }); // todo
      }
      //left
      for (let y = 0; y < map.length; y += 1) {
        outsideQueue.push({ x: map[y].length - 1, y: y }); // todo
      }
      //bottom
      for (let x = 0; x < map[0].length; x += 1) {
        outsideQueue.push({ x, y: map.length - 1 }); // todo
      }

      while (outsideQueue.length > 0) {
        const point = outsideQueue.shift()!;
        if (map[point.y][point.x] === "8") continue;
        for (let yy = Math.max(0, point.y - 1); yy < Math.min(map.length, point.y + 2); yy += 1) {
          for (let xx = Math.max(0, point.x - 1); xx < Math.min(map[yy].length, point.x + 2); xx += 1) {
            if (yy !== point.y || xx !== point.x) {
              const key = `${xx}.${yy}`;
              if (map[yy][xx] !== "8" && !outside.has(key)) {
                outside.add(key);
                outsideQueue.push({ x: xx, y: yy });
              }
            }
          }
        }
      }

      for (const key of [...outside.keys()]) {
        const [x, y] = key.split(".");
        map[Number(y)][Number(x)] = "O";
      }

      let sum = 0;
      for (let y = 0; y < map.length; y += 2) {
        for (let x = 0; x < map[y].length; x += 2) {
          if (map[y][x] !== "O" && map[y][x] !== "8") {
            sum += 1;
            // map[y][x] = "1";
          }
        }
      }

      console.log(sum);

      Deno.writeTextFileSync("out.txt", map.map((line) => line.join("")).join("\n"));
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
