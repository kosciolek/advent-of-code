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

let stepCounter = 0;
let location = "AAA";
while (location !== "ZZZ") {
  const direction = steps[stepCounter % steps.length] === "R" ? "right" : "left";
  location = nodes[location][direction];
  stepCounter += 1;
}

console.log(stepCounter);
