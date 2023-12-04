const answer = Deno.readTextFileSync("2023-4.txt")
  .split("\n")
  .map((line) => {
    const [wanted, owned] = line
      .slice(line.indexOf(":") + 1)
      .trim()
      .split(" | ");
    return {
      wanted: wanted.split(/\s+/).map((num) => Number(num)),
      owned: owned.split(/\s+/).map((num) => Number(num)),
    };
  })
  .reduce((sum, { owned, wanted }) => {
    let duplicates = 0;
    for (const o of owned) {
      if (wanted.includes(o)) {
        duplicates += 1;
      }
    }
    return duplicates > 0 ? sum + Math.pow(2, duplicates - 1) : sum;
  }, 0);

console.log(answer);
