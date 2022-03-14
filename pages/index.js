import Head from "next/head";
import Footer from "../components/Footer";
import { Fragment, useState } from "react";
import { solver, validInsert } from "../solver/sudoku";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const initialState = [
  [7, 8, 0, 4, 0, 0, 1, 2, 0],
  [6, 0, 0, 0, 7, 5, 0, 0, 9],
  [0, 0, 0, 6, 0, 1, 0, 7, 8],
  [0, 0, 7, 0, 4, 0, 2, 6, 0],
  [0, 0, 1, 0, 5, 0, 9, 3, 0],
  [9, 0, 4, 0, 6, 0, 0, 0, 5],
  [0, 7, 0, 3, 0, 0, 0, 1, 2],
  [1, 2, 0, 0, 0, 7, 4, 0, 0],
  [0, 4, 9, 2, 0, 6, 0, 0, 7],
];

export default function Home() {
  const [board, setBoard] = useState([...initialState.map((r) => [...r])]);
  const [invalidChar, setInvalidChar] = useState(false);
  const [invalidVal, setInvalidVal] = useState(false);

  const solveSudoku = () => {
    const solvedBoard = solver([...board.map((r) => [...r])]);
    setInvalidChar(false);
    setInvalidVal(false);
    setBoard(solvedBoard);
  };

  const exampleSudoku = () => {
    setBoard(initialState);
  };

  const resetEmpty = () => {
    setInvalidChar(false);
    setInvalidVal(false);
    setBoard([...new Array(9).fill([]).map((_) => [...new Array(9).fill(0)])]);
  };

  const updateBoard = (value, row, col) => {
    if (!validUserInput(value, row, col)) return;

    setBoard((prev) => {
      const newState = [
        ...prev.map((rows, rowIdx) => {
          return rows.map((colVal, colIdx) => {
            if (row === rowIdx && col == colIdx) {
              return (prev[rowIdx][colIdx] = Number(value));
            } else {
              return colVal;
            }
          });
        }),
      ];
      return newState;
    });
  };

  const validUserInput = (value, row, col) => {
    setInvalidChar(false);
    setInvalidVal(false);

    const int = Number(value);

    if (isNaN(int)) {
      setInvalidChar(true);
      return false;
    }
    if (int === "" || int === 0) {
      return;
    }
    if (int > 9 || int < 1) {
      setInvalidChar(true);
      return false;
    }
    if (!validInsert(int, row, col, board)) {
      setInvalidVal(true);
      return false;
    }
    return int;
  };

  return (
    <div className="h-screen bg-slate-900">
      <Head>
        <title>Sudoku Solver</title>
        <meta name="description" content="Sudoku Solver" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 sm:p-10">
        <div>
          <h1 className="text-3xl sm:text-4xl tracking-tight font-extrabold text-white text-center">
            Sudoku Solver
          </h1>
          <div className="flex justify-center items-center mt-5 sm:mt-8">
            <div className={classNames("grid grid-cols-9 text-sm shadow")}>
              {board.map((rows, rowIdx) => {
                return (
                  <Fragment key={rowIdx}>
                    {rows.map((col, colIdx) => {
                      const even =
                        rowIdx % 2 === 0 ? colIdx % 2 === 0 : colIdx % 2 !== 0;
                      const addBorderR =
                        (colIdx + 1) % 3 === 0 && colIdx + 1 < 9;
                      const addBorderB =
                        (rowIdx + 1) % 3 === 0 && rowIdx + 1 < 9;
                      return (
                        <div key={colIdx}>
                          <input
                            key={col}
                            onChange={(e) =>
                              updateBoard(e.target.value, rowIdx, colIdx)
                            }
                            className={classNames(
                              even ? "bg-gray-50" : "bg-white",
                              addBorderR && "border-r-2 border-pink-600",
                              addBorderB && "border-b-2 border-pink-600",
                              "text-center py-2 hover:bg-gray-100 focus:z-10 focus:outline-none bg-white text-cyan-600 font-medium sm:font-bold text-sm sm:text-lg w-8 h-8 sm:w-12 sm:h-12"
                            )}
                            defaultValue={col ? col : ""}
                          />
                        </div>
                      );
                    })}
                  </Fragment>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center items-center mt-4">
            {invalidChar && (
              <p className="font-normal text-pink-700">
                Hmm, that character isn&#39;t valid 🤨 
              </p>
            )}

            {invalidVal && (
              <p className="font-normal text-yellow-500">
               Oops, this is a conflict ✋ 
              </p>
            )}

            {!invalidVal && !invalidChar && (
              <p><br /></p> 
            )}
          </div>

          <div className="flex justify-center items-center mt-4">
            <button
              type="button"
              className="inline-flex items-center px-24 py-3 border-2 border-pink-700 text-md font-medium rounded text-white bg-pink-900 hover:bg-pink-700"
              onClick={() => solveSudoku()}
            >
              Solve
            </button>
          </div>
          <div className="flex justify-center items-center gap-3">
            <button
              type="button"
              className="inline-flex mt-2 items-center px-7 py-2 border-2 border-cyan-700 text-md font-medium rounded text-white bg-cyan-900 hover:bg-cyan-700"
              onClick={() => exampleSudoku()}
            >
              Example
            </button>
            <button
              type="button"
              className="inline-flex mt-2 items-center px-7 py-2 border-2 border-gray-700 text-md font-medium rounded text-white bg-gray-900 hover:bg-gray-700"
              onClick={() => resetEmpty()}
            >
              Clear
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
