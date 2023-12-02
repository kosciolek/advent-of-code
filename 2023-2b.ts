console.log(
  Deno.readTextFileSync("2023-2.txt")
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
    .reduce((sum, game) => {
      let maxRed = 0;
      let maxGreen = 0;
      let maxBlue = 0;
      for (const { red, green, blue } of game.sets) {
        maxRed = Math.max(maxRed, red);
        maxGreen = Math.max(maxGreen, green);
        maxBlue = Math.max(maxBlue, blue);
      }
      return sum + maxRed * maxGreen * maxBlue;
    }, 0)
);
