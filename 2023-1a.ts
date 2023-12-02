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
        }
      }
      return sum + Number(first! + last!);
    }, 0)
);
