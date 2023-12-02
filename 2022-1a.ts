const input = Deno.readTextFileSync("2022-1.txt");

const sums = input.split("\n\n").map((elf) =>
  elf
    .split("\n")
    .map((cal) => parseInt(cal, 10))
    .reduce((acc, curr) => acc + curr)
);

const out = Math.max(...sums);

console.log(out);
