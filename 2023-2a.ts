const redLimit = 12;
const greenLimit = 13;
const blueLimit = 14;

console.log(
  Deno.readTextFileSync("2.txt")
    .split("\n")
    .map((line, i) => ({
      id: i + 1,
      sets: line
        .slice(line.indexOf(":"))
        .split(";")
        .map((set) => {
          const red = /(\d+) red/.exec(set);
          const blue = /(\d+) blue/.exec(set);
          const green = /(\d+) green/.exec(set);
          return {
            red: red ? Number(red[1]) : 0,
            blue: blue ? Number(blue[1]) : 0,
            green: green ? Number(green[1]) : 0,
          };
        }),
    }))
    .filter((game) => game.sets.every((set) => set.red <= redLimit && set.green <= greenLimit && set.blue <= blueLimit))
    .reduce((acc, curr) => acc + curr.id, 0)
);
