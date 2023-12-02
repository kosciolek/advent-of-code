const input = Deno.readTextFileSync("2022-7.txt");

type File = {
  name: string;
  size: number;
};

type Dir = {
  name: string;
  parent: Dir | null;
  dirs: Dir[];
  files: File[];
};

const root: Dir = {
  name: "/",
  parent: null,
  dirs: [],
  files: [],
};

let cwd: Dir = root;
let parsingLs = false;

for (const line of input.split("\n")) {
  if (line.startsWith("$")) parsingLs = false;

  if (parsingLs) {
    if (line.startsWith("dir")) {
      const name = line.slice(line.lastIndexOf(" ") + 1);
      if (!cwd.dirs.find((d) => d.name === name))
        cwd.dirs.push({
          name,
          parent: cwd,
          files: [],
          dirs: [],
        });
      continue;
    }

    const [size, filename] = line.split(" ");
    if (!cwd.files.find((f) => f.name === filename)) cwd.files.push({ name: filename, size: Number(size) });
  }

  if (line === "$ cd /") {
    cwd = root;
    continue;
  }

  if (line === "$ cd ..") {
    cwd = cwd.parent as Dir;
    continue;
  }

  if (line.startsWith("$ cd")) {
    const path = line.slice(line.lastIndexOf(" ") + 1);
    cwd = cwd.dirs.find((d) => d.name === path)!;
  }

  if (line === "$ ls") {
    parsingLs = true;
    continue;
  }
}

let answer = 0;

const walk = (dir: Dir): number => {
  let sum = 0;

  for (const file of dir.files) {
    sum += file.size;
  }

  for (const subdir of dir.dirs) {
    sum += walk(subdir);
  }

  if (sum <= 1_00_000 && dir.name !== "/") answer += sum;

  return sum;
};

walk(root);

console.log(answer);
