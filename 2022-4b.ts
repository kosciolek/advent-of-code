const input = Deno.readTextFileSync("2022-4.txt");

const assignments = input.split("\n").map((line) =>
  line.split(",").map((elf) => {
    const delimiter = elf.indexOf("-");
    const start = elf.slice(0, delimiter);
    const end = elf.slice(delimiter + 1);
    return { start: Number(start), end: Number(end) };
  })
);

const out = assignments.filter(([elfA, elfB]) => {
  const startIntersects = elfA.start >= elfB.start && elfA.start <= elfB.end;
  const endIntersects = elfA.end >= elfB.start && elfA.end <= elfB.end;
  const contains = elfA.start <= elfB.start && elfA.end >= elfB.end;
  return startIntersects || endIntersects || contains;
}).length;

console.log(out);
