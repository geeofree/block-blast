import styled from "styled-components";
import { Board } from "./components";
import { useState } from "react";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const COLORS = ["violet", "orange", "tomato", "cyan"];

const getRandomNum = (n: number) => Math.floor(Math.random() * n);

/* function getClearableLines(board: Tiles["board"]): { */
/*   horizontal: Set<number>; */
/*   vertical: Set<number>; */
/* } { */
/*   const horizontal = new Set<number>(); */
/*   const vertical = new Set<number>(); */
/*   for (let y = 0; y < board.length; y++) { */
/*     let isVerticalClearable = true; */
/*     let isHorizontalClearable = true; */
/*     for (let x = 0; x < board[y].length; x++) { */
/*       if (board[x][y].occupiedColor === null) { */
/*         isVerticalClearable = false; */
/*       } */
/**/
/*       if (isVerticalClearable && x + 1 === board[y].length) { */
/*         vertical.add(y); */
/*       } */
/**/
/*       if (board[y][x].occupiedColor === null) { */
/*         isHorizontalClearable = false; */
/*       } */
/**/
/*       if (isHorizontalClearable && x + 1 === board[y].length) { */
/*         horizontal.add(y); */
/*       } */
/*     } */
/*   } */
/*   return { horizontal, vertical }; */
/* } */

export function App() {
  const [boardState, setBoardState] = useState<Board["board"]>([
    [
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
    ],
    [
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
    ],
    [
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
    ],
    [
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
    ],
    [
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
    ],
    [
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
    ],
    [
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
    ],
    [
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
      { occupiedColor: null },
    ],
  ]);

  const sample = [
    [0, 1, 8, 9],
    [2, 3, 10, 11],
    [4, 5, 12, 13],
    [6, 7, 14, 15],
    [17, 18, 25, 26],
    [33, 34, 41, 42],
    [49, 50, 57, 58],
  ];

  const [idx, setIdx] = useState(0);

  return (
    <AppContainer
      onClick={() => {
        const curr = sample[idx];
        setBoardState((currentBoardState) => {
          const newBoardState = currentBoardState.slice();
          const color = COLORS[getRandomNum(COLORS.length)];
          const max = newBoardState[0].length;
          curr.forEach((item) => {
            const x = Math.floor(item / max);
            const y = item % max;
            newBoardState[x][y].occupiedColor = color;
          });
          return newBoardState;
        });
        setIdx((idx) => (idx + 1 < sample.length ? idx + 1 : 0));
      }}
    >
      <Board width={512} height={512} board={boardState} />
    </AppContainer>
  );
}
