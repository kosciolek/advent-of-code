const input = Deno.readTextFileSync("2022-1.txt");

const sums = input
  .split("\n\n")
  .map((elf) =>
    elf
      .split("\n")
      .map((cal) => parseInt(cal, 10))
      .reduce((acc, curr) => acc + curr)
  )
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, curr) => acc + curr);

console.log(sums);
