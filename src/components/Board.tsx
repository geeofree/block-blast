import styled from "styled-components";

export type BoardContainer = Pick<Board, "width" | "height">;

export const BoardContainer = styled.section<BoardContainer>`
  border: 1px solid;
  max-width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export type BoardRow = Pick<Board, "height">;

export const BoardRow = styled.div<BoardRow>`
  display: flex;
  width: 100%;
  height: ${(props) => props.height}px;
  &:not(:last-child) {
    border-bottom: 1px solid;
  }
`;

export type BoardCol = Pick<Board, "width">;

export const BoardCol = styled.div<BoardCol>`
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  &:not(:last-child) {
    border-right: 1px solid;
  }
`;

export type BoardTile = {
  occupiedColor: string | null;
};

export type Board = {
  width: number;
  height: number;
  board: BoardTile[][];
};

export function Board(props: Board) {
  const { width, height, board } = props;

  return (
    <BoardContainer width={width} height={height}>
      {board.map((row, rowIdx) => (
        <BoardRow key={rowIdx} height={height / board.length}>
          {row.map((col, colIdx) => (
            <BoardCol
              key={colIdx}
              width={width / row.length}
              color={col.occupiedColor ?? ""}
            />
          ))}
        </BoardRow>
      ))}
    </BoardContainer>
  );
}
