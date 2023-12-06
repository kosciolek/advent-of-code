const [timeLine, distanceLine] = Deno.readTextFileSync("2023-6.txt").split("\n");
const times = [...timeLine.matchAll(/\d+/g)!].map(([time]) => Number(time));
const distances = [...distanceLine.matchAll(/\d+/g)!].map(([distance]) => Number(distance));

console.log(
  times.reduce((acc, time, index) => {
    const distance = distances[index];
    // CHARGE_TIME^2 - CHARGE_TIME * TOTAL_TIME + BEST_DISTANCE = 0
    const delta = time ** 2 - 4 * 1 * distance;
    const root1 = (time - Math.sqrt(delta)) / (2 * 1);
    const root2 = (time + Math.sqrt(delta)) / (2 * 1);
    const solutions = Math.ceil(root2) - Math.floor(root1) - 1;
    return acc * solutions;
  }, 1)
);
