const [seedsText, ...mapsText] = Deno.readTextFileSync("2023-5.txt").split("\n\n");

const seeds = seedsText
  .slice(seedsText.indexOf(":") + 2)
  .split(" ")
  .map((num) => Number(num));

const maps = mapsText.map((map) =>
  map
    .slice(map.indexOf("\n") + 1)
    .split("\n")
    .map((range) => {
      const [targetStart, sourceStart, length] = range.split(" ");
      return { targetStart: Number(targetStart), sourceStart: Number(sourceStart), length: Number(length) };
    })
);

const out = seeds.map((seed) =>
  maps.reduce((value, map) => {
    const range = map.find((range) => range.sourceStart <= value && value <= range.sourceStart + range.length - 1);
    if (range !== undefined) {
      return range.targetStart + value - range.sourceStart;
    }
    return value;
  }, seed)
);

console.log(Math.min(...out));
