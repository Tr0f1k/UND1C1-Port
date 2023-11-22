import React from 'react';
import './App.css'

const Pitch = ({ grid, team, handleSquareClick, availableSquares, selectedCircle, availablePassing, availableTackling, availableDribbling, availableShooting, remainingMovements }) => {
  console.log('Moves: ', remainingMovements);
  return (
  <div className="game-board">
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((square, colIndex) => {
        const isTractorSquare = square && remainingMovements === 0 && square?.skills?.includes('Tractor') && square.team === team && square.turnsDisabled <= 0;
        const isGMSquare = square?.gm;
        console.log ('square gm condition: ', isGMSquare);
        return (
          <div
            key={colIndex}
            className={`square ${
              square
                ? `circle team${square.team} ${square.name}`
                : ''
            } ${
              availablePassing.some((reciever) => {
                const match = reciever.row === rowIndex && reciever.col === colIndex;
                return match;
              })
              ? 'passing'
              : ''
            } ${
              availableSquares.some(
                (square) => square.row === rowIndex && square.col === colIndex
              )
                ? 'available'
                : ''
            } ${
              availableShooting.some(
                (square) => square.row === rowIndex && square.col === colIndex
              )
                ? 'shooting'
                : ''
            } ${
              availableTackling.some(
                (square) => square.row === rowIndex && square.col === colIndex
              )
                ? 'tackling'
                : ''
            } ${
              availableDribbling.some(
                (square) => square.row === rowIndex && square.col === colIndex
              )
                ? 'dribbling'
                : ''
            } ${
              square && square.turnsDisabled > 1
                ? 'disable'
                : ''
            } ${
              square && square?.gm
                ? 'gm'
                : ''
            } ${
              isTractorSquare
                ? 'tractor'
                : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 0 && colIndex === 1) ||
              (rowIndex === 0 && colIndex === 2) ||
              (rowIndex === 0 && colIndex === 13) ||
              (rowIndex === 0 && colIndex === 14) ||
              (rowIndex === 17 && colIndex === 1) ||
              (rowIndex === 17 && colIndex === 2) ||
              (rowIndex === 17 && colIndex === 13) ||
              (rowIndex === 17 && colIndex === 14)
              ? 'defence' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 0 && colIndex === 3) ||
              (rowIndex === 0 && colIndex === 4) ||
              (rowIndex === 0 && colIndex === 12) ||
              (rowIndex === 0 && colIndex === 11) ||
              (rowIndex === 17 && colIndex === 3) ||
              (rowIndex === 17 && colIndex === 4) ||
              (rowIndex === 17 && colIndex === 12) ||
              (rowIndex === 17 && colIndex === 11)
              ? 'midfield' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 0 && colIndex === 5) ||
              (rowIndex === 0 && colIndex === 6) ||
              (rowIndex === 0 && colIndex === 10) ||
              (rowIndex === 0 && colIndex === 9) ||
              (rowIndex === 17 && colIndex === 5) ||
              (rowIndex === 17 && colIndex === 6) ||
              (rowIndex === 17 && colIndex === 10) ||
              (rowIndex === 17 && colIndex === 9)
              ? 'attack' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 0 && colIndex === 7) ||
              (rowIndex === 0 && colIndex === 8) ||
              (rowIndex === 17 && colIndex === 7) ||
              (rowIndex === 17 && colIndex === 8)
              ? 'centerfield' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 0 && colIndex === 0) ||
              (rowIndex === 0 && colIndex === 15) ||
              (rowIndex === 17 && colIndex === 15) ||
              (rowIndex === 17 && colIndex === 0)
              ? 'corners' : ''
            } ${
              (rowIndex === 1 && colIndex === 0) ||
              (rowIndex === 2 && colIndex === 0) ||
              (rowIndex === 3 && colIndex === 0) ||
              (rowIndex === 4 && colIndex === 0) ||
              (rowIndex === 5 && colIndex === 0) ||
              (rowIndex === 6 && colIndex === 0) ||
              (rowIndex === 7 && colIndex === 0) ||
              (rowIndex === 10 && colIndex === 0) ||
              (rowIndex === 11 && colIndex === 0) ||
              (rowIndex === 12 && colIndex === 0) ||
              (rowIndex === 13 && colIndex === 0) ||
              (rowIndex === 14 && colIndex === 0) ||
              (rowIndex === 15 && colIndex === 0) ||
              (rowIndex === 16 && colIndex === 0) ||
              (rowIndex === 1 && colIndex === 15) ||
              (rowIndex === 2 && colIndex === 15) ||
              (rowIndex === 3 && colIndex === 15) ||
              (rowIndex === 4 && colIndex === 15) ||
              (rowIndex === 5 && colIndex === 15) ||
              (rowIndex === 6 && colIndex === 15) ||
              (rowIndex === 7 && colIndex === 15) ||
              (rowIndex === 10 && colIndex === 15) ||
              (rowIndex === 11 && colIndex === 15) ||
              (rowIndex === 12 && colIndex === 15) ||
              (rowIndex === 13 && colIndex === 15) ||
              (rowIndex === 14 && colIndex === 15) ||
              (rowIndex === 15 && colIndex === 15) ||
              (rowIndex === 16 && colIndex === 15)
              ? 'bounds' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 10 && colIndex === 1) ||
              (rowIndex === 11 && colIndex === 2)
              ? 'bottomrightborder' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 1 && colIndex === 0) ||
              (rowIndex === 2 && colIndex === 0) ||
              (rowIndex === 3 && colIndex === 0) ||
              (rowIndex === 4 && colIndex === 0) ||
              (rowIndex === 5 && colIndex === 0) ||
              (rowIndex === 6 && colIndex === 0) ||
              (rowIndex === 7 && colIndex === 0) ||
              (rowIndex === 8 && colIndex === 0) ||
              (rowIndex === 9 && colIndex === 0) ||
              (rowIndex === 10 && colIndex === 0) ||
              (rowIndex === 11 && colIndex === 0) ||
              (rowIndex === 12 && colIndex === 0) ||
              (rowIndex === 13 && colIndex === 0) ||
              (rowIndex === 14 && colIndex === 0) ||
              (rowIndex === 15 && colIndex === 0) ||
              (rowIndex === 16 && colIndex === 0) ||
              (rowIndex === 8 && colIndex === 1) ||
              (rowIndex === 9 && colIndex === 1) ||
              (rowIndex === 7 && colIndex === 2) ||
              (rowIndex === 8 && colIndex === 2) ||
              (rowIndex === 9 && colIndex === 2) ||
              (rowIndex === 10 && colIndex === 2) ||
              (rowIndex === 8 && colIndex === 13) ||
              (rowIndex === 9 && colIndex === 13) ||
              (rowIndex === 7 && colIndex === 12) ||
              (rowIndex === 8 && colIndex === 12) ||
              (rowIndex === 9 && colIndex === 12) ||
              (rowIndex === 10 && colIndex === 12) ||
              (rowIndex === 1 && colIndex === 14) ||
              (rowIndex === 2 && colIndex === 14) ||
              (rowIndex === 3 && colIndex === 14) ||
              (rowIndex === 4 && colIndex === 14) ||
              (rowIndex === 5 && colIndex === 14) ||
              (rowIndex === 6 && colIndex === 14) ||
              (rowIndex === 7 && colIndex === 14) ||
              (rowIndex === 8 && colIndex === 14) ||
              (rowIndex === 9 && colIndex === 14) ||
              (rowIndex === 10 && colIndex === 14) ||
              (rowIndex === 11 && colIndex === 14) ||
              (rowIndex === 12 && colIndex === 14) ||
              (rowIndex === 13 && colIndex === 14) ||
              (rowIndex === 14 && colIndex === 14) ||
              (rowIndex === 15 && colIndex === 14) ||
              (rowIndex === 16 && colIndex === 14) ||
              (rowIndex === 1 && colIndex === 7) ||
              (rowIndex === 2 && colIndex === 7) ||
              (rowIndex === 3 && colIndex === 7) ||
              (rowIndex === 4 && colIndex === 7) ||
              (rowIndex === 5 && colIndex === 7) ||
              (rowIndex === 6 && colIndex === 7) ||
              (rowIndex === 7 && colIndex === 7) ||
              (rowIndex === 8 && colIndex === 7) ||
              (rowIndex === 9 && colIndex === 7) ||
              (rowIndex === 10 && colIndex === 7) ||
              (rowIndex === 11 && colIndex === 7) ||
              (rowIndex === 12 && colIndex === 7) ||
              (rowIndex === 13 && colIndex === 7) ||
              (rowIndex === 14 && colIndex === 7) ||
              (rowIndex === 15 && colIndex === 7) ||
              (rowIndex === 16 && colIndex === 7)
              ? 'rightborder' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 11 && colIndex === 1) ||
              (rowIndex === 5 && colIndex === 1) ||
              (rowIndex === 5 && colIndex === 14) ||
              (rowIndex === 11 && colIndex === 14) 
              ? 'bottomborder' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 7 && colIndex === 14) ||
              (rowIndex === 6 && colIndex === 13)  
              ? 'topleftborder' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 7 && colIndex === 1) ||
              (rowIndex === 6 && colIndex === 2)  
              ? 'toprightborder' : ''
            } ${
              // Conditionally apply a different class for the background color
              (rowIndex === 10 && colIndex === 14) ||
              (rowIndex === 11 && colIndex === 13)  
              ? 'bottomleftborder' : ''
            }`}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {square && (
              <div className={`inner ${square.team === 2 ? 'rotate' : ''}`}>
                {square.hasBall && <div className="ball"></div>}
                {'•'}
              </div>
            )}
            {rowIndex === 7 && colIndex === 1 && <div className="custom-content">+3</div>}
            {rowIndex === 8 && colIndex === 1 && <div className="custom-content">+4</div>}
            {rowIndex === 9 && colIndex === 1 && <div className="custom-content">+4</div>}
            {rowIndex === 10 && colIndex === 1 && <div className="custom-content">+3</div>}
            {rowIndex === 6 && colIndex === 2 && <div className="custom-content">+0</div>}
            {rowIndex === 7 && colIndex === 2 && <div className="custom-content">+1</div>}
            {rowIndex === 8 && colIndex === 2 && <div className="custom-content">+2</div>}
            {rowIndex === 9 && colIndex === 2 && <div className="custom-content">+2</div>}
            {rowIndex === 10 && colIndex === 2 && <div className="custom-content">+1</div>}
            {rowIndex === 11 && colIndex === 2 && <div className="custom-content">+0</div>}
            {rowIndex === 5 && colIndex === 3 && <div className="custom-content">-3</div>}
            {rowIndex === 6 && colIndex === 3 && <div className="custom-content">-2</div>}
            {rowIndex === 7 && colIndex === 3 && <div className="custom-content">-1</div>}
            {rowIndex === 8 && colIndex === 3 && <div className="custom-content">-0</div>}
            {rowIndex === 9 && colIndex === 3 && <div className="custom-content">-0</div>}
            {rowIndex === 10 && colIndex === 3 && <div className="custom-content">-1</div>}
            {rowIndex === 11 && colIndex === 3 && <div className="custom-content">-2</div>}
            {rowIndex === 12 && colIndex === 3 && <div className="custom-content">-3</div>}
            {rowIndex === 6 && colIndex === 4 && <div className="custom-content">-4</div>}
            {rowIndex === 7 && colIndex === 4 && <div className="custom-content">-3</div>}
            {rowIndex === 8 && colIndex === 4 && <div className="custom-content">-2</div>}
            {rowIndex === 9 && colIndex === 4 && <div className="custom-content">-2</div>}
            {rowIndex === 10 && colIndex === 4 && <div className="custom-content">-3</div>}
            {rowIndex === 11 && colIndex === 4 && <div className="custom-content">-4</div>}
            {rowIndex === 6 && colIndex === 11 && <div className="custom-content">-4</div>}
            {rowIndex === 7 && colIndex === 11 && <div className="custom-content">-3</div>}
            {rowIndex === 8 && colIndex === 11 && <div className="custom-content">-2</div>}
            {rowIndex === 9 && colIndex === 11 && <div className="custom-content">-2</div>}
            {rowIndex === 10 && colIndex === 11 && <div className="custom-content">-3</div>}
            {rowIndex === 11 && colIndex === 11 && <div className="custom-content">-4</div>}
            {rowIndex === 5 && colIndex === 12 && <div className="custom-content">-3</div>}
            {rowIndex === 6 && colIndex === 12 && <div className="custom-content">-2</div>}
            {rowIndex === 7 && colIndex === 12 && <div className="custom-content">-1</div>}
            {rowIndex === 8 && colIndex === 12 && <div className="custom-content">-0</div>}
            {rowIndex === 9 && colIndex === 12 && <div className="custom-content">-0</div>}
            {rowIndex === 10 && colIndex === 12 && <div className="custom-content">-1</div>}
            {rowIndex === 11 && colIndex === 12 && <div className="custom-content">-2</div>}
            {rowIndex === 12 && colIndex === 12 && <div className="custom-content">-3</div>}
            {rowIndex === 6 && colIndex === 13 && <div className="custom-content">+0</div>}
            {rowIndex === 7 && colIndex === 13 && <div className="custom-content">+1</div>}
            {rowIndex === 8 && colIndex === 13 && <div className="custom-content">+2</div>}
            {rowIndex === 9 && colIndex === 13 && <div className="custom-content">+2</div>}
            {rowIndex === 10 && colIndex === 13 && <div className="custom-content">+1</div>}
            {rowIndex === 11 && colIndex === 13 && <div className="custom-content">+0</div>}
            {rowIndex === 7 && colIndex === 14 && <div className="custom-content">+3</div>}
            {rowIndex === 8 && colIndex === 14 && <div className="custom-content">+4</div>}
            {rowIndex === 9 && colIndex === 14 && <div className="custom-content">+4</div>}
            {rowIndex === 10 && colIndex === 14 && <div className="custom-content">+3</div>}
            </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default Pitch;

