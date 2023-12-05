const [seedsText, ...mapsText] = Deno.readTextFileSync("2023-5.txt").split("\n\n");

const seedRanges = seedsText
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

let min = Infinity;

// TODO (probably never)
// Operating on single digits is very unperformant. It'd be better to operate on whole ranges,
// Or find the min in some clever way without computing everything, like go from the bottom
for (let i = 0; i < seedRanges.length; i += 2) {
  const start = seedRanges[i];
  const length = seedRanges[i + 1];
  for (let seed = start; seed < start + length; seed += 1) {
    const location = maps.reduce((value, map) => {
      const range = map.find((range) => range.sourceStart <= value && value <= range.sourceStart + range.length - 1);
      if (range !== undefined) {
        return range.targetStart + value - range.sourceStart;
      }
      return value;
    }, seed);
    if (location < min) {
      min = location;
    }
  }
}

console.log(min);
