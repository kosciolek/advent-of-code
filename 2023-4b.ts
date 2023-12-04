const cards = Deno.readTextFileSync("2023-4.txt")
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
  });

const getCardCount = (index: number) => {
  let count = 0;
  let duplicates = 0;

  for (const o of cards[index].owned) {
    if (cards[index].wanted.includes(o)) {
      duplicates += 1;
      count += getCardCount(index + duplicates);
    }
  }

  return count + 1;
};

let sum = 0;
for (let i = 0; i < cards.length; i++) {
  sum += getCardCount(i);
}
console.log(sum);
