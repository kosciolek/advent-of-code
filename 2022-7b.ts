const input = Deno.readTextFileSync("2022-7.txt");

const diskSize = 70_000_000;
const required = 30_000_000;

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

const walk = (dir: Dir): number => {
  let sum = 0;

  for (const file of dir.files) {
    sum += file.size;
  }

  for (const subdir of dir.dirs) {
    sum += walk(subdir);
  }

  return sum;
};

const rootSize = walk(root);

const free = diskSize - rootSize;
const deletableLimit = required - free;

const candidates: number[] = [];

const walk2 = (dir: Dir): number => {
  let sum = 0;

  for (const file of dir.files) {
    sum += file.size;
  }

  for (const subdir of dir.dirs) {
    sum += walk2(subdir);
  }

  if (sum >= deletableLimit && dir.name !== "/") candidates.push(sum);

  return sum;
};

walk2(root);

console.log(Math.min(...candidates));
