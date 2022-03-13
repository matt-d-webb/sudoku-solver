export const solver = (board) => {
  const boardCopy = [...board.map(r => [...r])];
  initiateSolving(0, 0, boardCopy);
  return boardCopy;
};

const initiateSolving = (row, col, board) => {
  let currentR = row;
  let currentC = col;

  if (currentC === board[currentR].length) {
    currentR++;
    currentC = 0;
    // checked all cells
    if (currentR === board.length) return true;
  }

  if (board[currentR][currentC] === 0) {
    return tryValue(currentR, currentC, board);
  }

  return initiateSolving(currentR, currentC + 1, board);
};

const tryValue = (row, col, board) => {
  for (let v = 1; v < 10; v++) {
    if (validInsert(v, row, col, board)) {
      board[row][col] = v;
      if (initiateSolving(row, col + 1, board)) return true;
    }
  }

  board[row][col] = 0;
  return false;
};

export const validInsert = (value, row, col, board) => {
  const rowValid = !board[row].includes(value);
  const colValid = !board.map((r) => r[col]).includes(value);

  if (!rowValid || !colValid) return false;

  const nextRow = Math.floor(row / 3) * 3;
  const nextCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[nextRow + r][nextCol + c] === value) return false;
    }
  }
  return true;
};
