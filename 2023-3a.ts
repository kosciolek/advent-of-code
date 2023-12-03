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

for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
  let currentNumber: string | null = null;
  for (let columnIndex = 0; columnIndex < input[rowIndex].length; columnIndex++) {
    const char = input[rowIndex][columnIndex];
    if (isDigit(char)) {
      if (currentNumber === null) {
        currentNumber = char;
      } else {
        currentNumber += char;
      }
    } else if (currentNumber !== null) {
      if (isPart(rowIndex, columnIndex - currentNumber.length, currentNumber.length)) {
        sum += Number(currentNumber);
      }
      currentNumber = null;
    }
  }
  if (currentNumber !== null) {
    if (isPart(rowIndex, input[rowIndex].length - currentNumber.length, currentNumber.length)) {
      sum += Number(currentNumber);
    }
  }
  currentNumber = null;
}

console.log(sum);
