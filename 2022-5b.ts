const input = Deno.readTextFileSync("2022-5.txt");

type Move = {
  from: number;
  to: number;
  times: number;
};

type Stack = string[];

type Data = {
  moves: Move[];
  stacks: Stack[];
};

const parse = (input: string): Data => {
  const stacksEnd = input.lastIndexOf("]") + 1;
  const stackParts = input
    .slice(0, stacksEnd)
    .split("\n")
    .map((line) => {
      const parts = [];
      for (let i = 0; i < line.length; i += 4) {
        const part = line.slice(i, i + 3);
        parts.push(part === "   " ? part : part[1]);
      }
      return parts;
    });

  const stacks: string[][] = [];

  for (let column = 0; column < stackParts[0].length; column++) {
    stacks.push([]);
    for (let row = 0; row < stackParts.length; row++) {
      const part = stackParts[stackParts.length - 1 - row][column];
      if (part !== "   ") stacks[stacks.length - 1].push(part);
    }
  }

  const movesStart = input.indexOf("m");
  const moves = input
    .slice(movesStart)
    .split("\n")
    .map((line) => {
      const [_, times, from, to] = /^move (\d+) from (\d+) to (\d+)$/.exec(line)!;

      return {
        times: Number(times),
        from: Number(from) - 1,
        to: Number(to) - 1,
      };
    });

  return {
    moves,
    stacks,
  };
};

const data = parse(input);

const move = (stacks: Stack[], times: number, from: number, to: number) => {
  const removed = stacks[from].splice(stacks[from].length - times, times);
  stacks[to].push(...removed);
};

for (const { times, from, to } of data.moves) move(data.stacks, times, from, to);

const out = data.stacks.map((stack) => stack[stack.length - 1]).join("");

console.log(out);
