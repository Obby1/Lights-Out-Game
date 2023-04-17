import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 4, ncols = 4, chanceLightStartsOn = 0.25}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++){
      let tempRow = [];
      for (let j = 0; j < ncols; j++){
        tempRow.push(chanceLightStartsOn > (Math.random()))

      }
      initialBoard.push(tempRow);
    }
    // TODO: create array-of-arrays of true/false values
    // console.log(initialBoard);
    return initialBoard;
  }

  // TODO: check the board in state to determine whether the player has won.
  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      // given coord, split them into array of 2 numbers
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // check y & x values to ensure they are actually on the board dimensions, 
        // then flip to opposite
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      // below calls flipCell for every combination of neighboring cell
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // console.log(boardCopy);
      // TODO: return the copy
      return boardCopy;
    });
  }




  if (hasWon()) {
    return (
      <div>
        <h1>You have won!</h1>
        <button onClick={() => window.location.reload()}>Play Again?</button>
      </div>
    );
  }

  // TODO
  // make table board
  const tableBoard = (
    <table className="Board">
      <tbody>
        {/* for each row element, assign index to y */}
        {board.map((row, y) => (
          <tr key={y}>
            {/* for each cell element, assigned index to x */}
            {/* cell is boolean value assigned at createBoard or flipCellsAround */}
            {row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h1>Lights Out!</h1>
      {tableBoard}
    </div>
  );



}

export default Board;



