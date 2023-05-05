const totalColumns = 7;
const totalRows = 6;
const totalSlots = totalColumns * totalRows;

export const checkEndGame = (board) => {
  const flattedBoard = board.flat();
  return flattedBoard.every((cel) => cel != null);
};

export const checkWinnerFrom = (board) => {
  const posibleCombos = getPosibleCombos(board);
  let winner = null;
  posibleCombos.forEach((combo) => {
    const reducer = combo.reduce((obj, cv) => {
      if (obj[cv] && obj.prev === cv) {
        obj[cv] += 1;
      } else if (obj[cv] && obj.prev !== cv && obj[cv] < 4) {
        obj[cv] = 1;
        obj.prev = cv;
      } else if (!obj[cv]) {
        obj[cv] = 1;
        obj.prev = cv;
      }
      return obj;
    }, {});

    Object.entries(reducer).forEach((a) => {
      if (a[0] !== "null" && a[1] >= 4) {
        winner = a[0];
      }
    });
  });
  return winner;
};

const getPosibleCombos = (board) => {
  const horizontals = getHorizontals(board);
  const verticals = getVerticals(board);
  const diagonals = getDiagonals(board);
  const reversedDiagonals = getReversedDiagonals(board);

  return [...verticals, ...horizontals, ...diagonals, ...reversedDiagonals];
};

export const getVerticals = (board) => {
  const verticals = [];
  for (let col = 0; col < totalSlots; col += totalRows) {
    const newVertical = [];
    for (let slot = col; slot < col + totalRows; slot++) {
      newVertical.push(slot);
    }
    verticals.push(newVertical);
  }

  return verticals.map((vertical) => vertical.map((index) => board[index]));
};

const getHorizontals = (board) => {
  const horizontals = [];
  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const newRow = [];
    for (let colIndex = 0; colIndex < totalColumns; colIndex++) {
      newRow.push(colIndex * totalRows + rowIndex);
    }
    horizontals.push(newRow);
  }

  return horizontals.map((horizontal) =>
    horizontal.map((index) => board[index])
  );
};

const getDiagonals = (board) => {
  const firstRow = [];
  for (let i = 0; i < totalSlots; i += totalRows) {
    firstRow.push(i);
  }

  const lastColumn = [];
  for (let i = totalSlots - totalRows + 1; i < totalSlots; i++) {
    lastColumn.push(i);
  }

  const indexes = [...firstRow, ...lastColumn];
  let diagonals = [];
  indexes.forEach((index) => {
    const newRow = [];
    for (let i = index; i >= 0; i -= totalRows - 1) {
      if (!diagonals.flat().includes(i)) {
        newRow.push(i);
      }
    }
    diagonals.push(newRow);
  });

  diagonals = diagonals.filter((diag) => diag.length >= 4);
  return diagonals.map((combo) => combo.map((index) => board[index]));
};

const getReversedDiagonals = (board) => {
  const lastRowIndexes = [];
  for (let i = totalRows - 1; i <= totalSlots; i += totalRows) {
    lastRowIndexes.push(i);
  }

  const lastColumnIndexes = [];
  for (let i = totalSlots - totalRows; i < totalSlots; i++) {
    lastColumnIndexes.push(i);
  }
  const lastColumnIndexesReorder = [...lastColumnIndexes].reverse();
  const indexes = [...lastRowIndexes, ...lastColumnIndexesReorder];

  let diagonals = [];

  indexes.forEach((index) => {
    const newRow = [];
    for (let i = index; i >= 0; i -= totalRows + 1) {
      if (!diagonals.flat().includes(i)) {
        newRow.push(i);
      }
    }
    diagonals.push(newRow);
  });

  diagonals = diagonals.filter((diag) => diag.length >= 4);
  return diagonals.map((combo) => combo.map((index) => board[index]));
};
