const input = Deno.readTextFileSync("2022-8.txt");

const trees = input.split("\n").map((line) => line.split("").map(Number));

const visibility = Array.from<boolean[]>({ length: trees.length }).map(() =>
  Array.from<boolean>({ length: trees[0].length }).fill(false)
);

const check = (vDir: number, hDir: number) => {
  const vFrom = vDir > 0 ? 0 : trees.length - 1;
  const vStep = vDir > 0 ? 1 : -1;
  const vCond = (row: number) => (vDir > 0 ? row <= trees.length - 1 : row >= 0);

  for (let row = vFrom; vCond(row); row += vStep) {
    const hFrom = hDir > 0 ? 0 : trees[0].length - 1;
    const hStep = hDir > 0 ? 1 : -1;
    const hCond = (column: number) => (hDir > 0 ? column <= trees[0].length - 1 : column >= 0);

    let max = -Infinity;
    for (let column = hFrom; hCond(column); column += hStep) {
      const element = trees[row][column];

      if (element > max) {
        visibility[row][column] = true;
      }

      max = Math.max(max, element);
    }
  }
};

check(1, 1);
check(1, -1);
check(-1, 1);
check(-1, -1);

const answer = visibility.reduce((acc, curr) => acc + curr.reduce((a, c) => a + Number(c), 0), 0);

console.log(trees);
console.log(visibility);
console.log(answer);
