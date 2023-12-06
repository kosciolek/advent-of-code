const [timeLine, distanceLine] = Deno.readTextFileSync("2023-6.txt").split("\n");
const time = Number(timeLine.replace(/[^\d]/g, ""));
const distance = Number(distanceLine.replace(/[^\d]/g, ""));

const delta = time ** 2 - 4 * 1 * distance;
// CHARGE_TIME^2 - CHARGE_TIME * TOTAL_TIME + BEST_DISTANCE = 0
const root1 = (time - Math.sqrt(delta)) / (2 * 1);
const root2 = (time + Math.sqrt(delta)) / (2 * 1);
const solutions = Math.ceil(root2) - Math.floor(root1) - 1;
console.log(solutions);
