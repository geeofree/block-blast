import styled from "styled-components";
import { Tiles } from "./components";
import { useEffect, useState } from "react";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const COLORS = ["violet", "orange", "tomato", "cyan"];

const getRandomNum = (n: number) => Math.floor(Math.random() * n);

export function App() {
  const [boardState, setBoardState] = useState<Tiles["board"]>([
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
    [0, 1, 2, 9],
    [3, 4, 5, 12],
    [6, 7, 14, 15],
  ];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // TODO: Update the board when we clear a line.
    // TODO: Figure out which data structure to use for line clearing.
    console.log(boardState);
  }, [idx]);

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
      <Tiles width={512} height={512} board={boardState} />
    </AppContainer>
  );
}
