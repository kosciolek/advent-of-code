const answer = Deno.readTextFileSync("2023-9.txt")
  .split("\n")
  .map((line) => line.split(" ").map((reading) => Number(reading)))
  .map((readings) => {
    const triangle = [readings];
    let requiresNextSequence = true;
    while (requiresNextSequence) {
      requiresNextSequence = false;
      const currentSequence = triangle[triangle.length - 1];
      const newSequence: number[] = [];
      for (let i = 1; i < currentSequence.length; i += 1) {
        const diff = currentSequence[i] - currentSequence[i - 1];
        newSequence.push(diff);
        if (diff !== 0) {
          requiresNextSequence = true;
        }
      }
      triangle.push(newSequence);
    }
    let prevValue = 0;
    for (let i = triangle.length - 2; i >= 0; i -= 1) {
      prevValue = triangle[i][0] - prevValue;
    }
    return prevValue;
  })
  .reduce((sum, current) => sum + current);

console.log(answer);
