import { solver, validInsert, emptyBoard, Board } from './sudoku';

describe('Sudoku Solver', () => {
  describe('validInsert', () => {
    const exampleBoard: Board = [
      [7, 8, 0, 4, 0, 0, 1, 2, 0],
    ];

    it('should return true for a valid insertion', () => {
      expect(validInsert(3, 0, 2, exampleBoard)).toBe(true);
    });

    it('should return false for an invalid insertion in the same row', () => {
      expect(validInsert(1, 0, 2, exampleBoard)).toBe(false);
    });

    it('should return false for an invalid insertion in the same column', () => {
      expect(validInsert(6, 0, 6, exampleBoard)).toBe(false);
    });

    it('should return false for an invalid insertion in the same 3x3 box', () => {
      expect(validInsert(9, 2, 4, exampleBoard)).toBe(false);
    });
  });

  describe('solver', () => {
    const exampleUnsolvedBoard: Board = [
      [7, 8, 0, 4, 0, 0, 1, 2, 0]
    ];

    it('should solve a given Sudoku board', () => {
      const solvedBoard = solver(exampleUnsolvedBoard);

      expect(solvedBoard).toBe(exampleUnsolvedBoard);

    });
  });

  describe('emptyBoard', () => {
    it('should create an empty 9x9 Sudoku board', () => {
      const board = emptyBoard();
      expect(board).toHaveLength(9);
      board.forEach(row => {
        expect(row).toHaveLength(9);
        expect(row.every(cell => cell === 0)).toBe(true);
      });
    });
  });
});
