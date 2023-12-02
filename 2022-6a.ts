const input = Deno.readTextFileSync("2022-6.txt");

const map: Record<string, number> = {};

const last: string[] = Array.from<string>({ length: 4 }).fill("");
let diff = 0;
let index = 0;

const register = (letter: string) => {
  const current = last[index];
  map[current] -= 1;
  if (map[current] === 0) diff -= 1;
  map[letter] = (map[letter] ?? 0) + 1;
  if (map[letter] === 1) diff += 1;
  last[index] = letter;
  index = (index + 1) % 4;
};

const letters = input.split("");
for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  register(letter);
  if (diff === 4) {
    console.log(i + 1);
    Deno.exit();
  }
}
