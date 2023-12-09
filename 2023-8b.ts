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

let stepCounter = 0;

while (currentLocations.some((loc) => !loc.endsWith("Z"))) {
  const direction = steps[stepCounter % steps.length] === "R" ? "right" : "left";
  for (let i = 0; i < currentLocations.length; i += 1) {
    currentLocations[i] = nodes[currentLocations[i]][direction];
  }
  stepCounter += 1;
}

console.log(stepCounter);
