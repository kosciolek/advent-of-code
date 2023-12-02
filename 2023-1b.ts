const NUMBERS = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
};

console.log(
  Deno.readTextFileSync("1.txt")
    .split("\n")
    .reduce((sum, line) => {
      let first: string | null = null;
      let last: string | null = null;

      for (let i = 0; i < line.length; i++) {
        if (48 <= line.charCodeAt(i) && line.charCodeAt(i) <= 57) {
          if (first === null) {
            first = line[i];
          }
          last = line[i];
          continue;
        }
        for (const [word, number] of Object.entries(NUMBERS)) {
          if (line.slice(i).startsWith(word)) {
            if (first === null) {
              first = number;
            }
            last = number;
          }
        }
      }
      return sum + Number(first! + last!);
    }, 0)
);
