const input = Deno.readTextFileSync("2023-3.txt")
  .split("\n")
  .map((line) => line.split(""));

const isDigit = (char: string) => 48 <= char.charCodeAt(0) && char.charCodeAt(0) <= 57;

const isSymbol = (char: string) => !isDigit(char) && char !== ".";

const isPart = (row: number, column: number, length: number): boolean => {
  // row above
  if (row !== 0) {
    for (
      let columnIndex = Math.max(column - 1, 0);
      columnIndex <= Math.min(column + length, input[row - 1].length - 1);
      columnIndex++
    ) {
      if (isSymbol(input[row - 1][columnIndex])) {
        return true;
      }
    }
  }

  // middle row
  const isSymbolBefore = column !== 0 && isSymbol(input[row][column - 1]);
  const isSymbolAfter = column + length !== input[row].length && isSymbol(input[row][column + length]);
  if (isSymbolBefore || isSymbolAfter) {
    return true;
  }

  // row above
  if (row !== input.length - 1) {
    for (
      let columnIndex = Math.max(column - 1, 0);
      columnIndex <= Math.min(column + length, input[row + 1].length - 1);
      columnIndex++
    ) {
      if (isSymbol(input[row + 1][columnIndex])) {
        return true;
      }
    }
  }

  return false;
};

let sum = 0;

const scanNumber = (rowIndex: number, partColumnIndex: number) => {
  let start = partColumnIndex;
  let end = partColumnIndex;
  while (start - 1 >= 0 && isDigit(input[rowIndex][start - 1])) {
    start -= 1;
  }
  while (end + 1 < input[rowIndex].length && isDigit(input[rowIndex][end + 1])) {
    end += 1;
  }
  return {
    column: start,
    length: end - start + 1,
  };
};

const handleGear = (rowIndex: number, columnIndex: number) => {
  const numbers: Array<{ row: number; column: number; length: number; isPart: boolean }> = [];
  for (let r = rowIndex - 1; r <= rowIndex + 1; r += 1) {
    for (let c = columnIndex - 1; c <= columnIndex + 1; c += 1) {
      if (
        r >= 0 &&
        r < input.length &&
        c >= 0 &&
        c < input[r].length &&
        (r !== rowIndex || c !== columnIndex) &&
        isDigit(input[r][c])
      ) {
        const { column, length } = scanNumber(r, c);
        const isAlreadyFound = numbers.some((n) => n.row === r && n.column === column);
        if (!isAlreadyFound) {
          numbers.push({
            column: column,
            length,
            isPart: isPart(r, column, length),
            row: r,
          });
        }
      }
    }
  }

  const partNumbers = numbers.filter((n) => n.isPart);
  if (partNumbers.length === 2) {
    const [firstPartNumber, secondPartNumber] = partNumbers;
    sum +=
      Number(
        input[firstPartNumber.row]
          .slice(firstPartNumber.column, firstPartNumber.column + firstPartNumber.length)
          .join("")
      ) *
      Number(
        input[secondPartNumber.row]
          .slice(secondPartNumber.column, secondPartNumber.column + secondPartNumber.length)
          .join("")
      );
  }
};

for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
  for (let columnIndex = 0; columnIndex < input[rowIndex].length; columnIndex++) {
    const char = input[rowIndex][columnIndex];
    if (char === "*") {
      handleGear(rowIndex, columnIndex);
    }
  }
}

console.log(sum);
