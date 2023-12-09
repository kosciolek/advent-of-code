// gcd from wikipedia because i can never remember how it works
const gcd = (a: number, b: number) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const lcm = (a: number, b: number) => {
  return a * (b / gcd(a, b));
};

const [stepsText, nodesText] = Deno.readTextFileSync("2023-8.txt").split("\n\n");
const steps = stepsText.split("");

const nodes = Object.fromEntries(
  nodesText
    .split("\n")
    .map((line) => {
      const [_, parent, left, right] = /^([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)$/.exec(line)!;
      return { parent, left, right };
    })
    .map(({ parent, left, right }) => [parent, { left, right }])
);

const currentLocations = Object.keys(nodes).filter((node) => node.endsWith("A"));
const cycleStartingPoints = Array.from<null | { location: string; stepCounter: number }>({
  length: currentLocations.length,
}).fill(null);
const cycleLengths = Array.from<number>({ length: currentLocations.length }).fill(0);

let stepCounter = 0;

main: while (currentLocations.some((loc) => !loc.endsWith("Z"))) {
  const direction = steps[stepCounter % steps.length] === "R" ? "right" : "left";
  for (let i = 0; i < currentLocations.length; i += 1) {
    currentLocations[i] = nodes[currentLocations[i]][direction];
    if (currentLocations[i].endsWith("Z")) {
      const existing = cycleStartingPoints[i];
      if (existing === null) {
        cycleStartingPoints[i] = {
          location: currentLocations[i],
          stepCounter: stepCounter,
        };
      } else if (currentLocations[i] === existing.location && cycleLengths[i] === 0) {
        cycleLengths[i] = stepCounter - existing.stepCounter;
      }
    }
  }
  if (cycleLengths.every((c) => c !== 0)) {
    // all cycles found
    break main;
  }
  stepCounter += 1;
}

console.log(cycleLengths.reduce((acc, curr) => lcm(acc, curr)));
