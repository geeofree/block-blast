import styled from "styled-components";

export type TileContainer = Pick<Tiles, "width" | "height">;

export const TileContainer = styled.section<TileContainer>`
  border: 1px solid;
  max-width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export type TileRow = Pick<Tiles, "height">;

export const TileRow = styled.div<TileRow>`
  display: flex;
  width: 100%;
  height: ${(props) => props.height}px;
  &:not(:last-child) {
    border-bottom: 1px solid;
  }
`;

export type TileCol = BoardCol & Pick<Tiles, "width">;

export const TileCol = styled.div<TileCol>`
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  &:not(:last-child) {
    border-right: 1px solid;
  }
`;

export type BoardCol = {
  color?: string;
};

export type Tiles = {
  width: number;
  height: number;
  board: BoardCol[][];
};

export function Tiles(props: Tiles) {
  const { width, height, board } = props;

  return (
    <TileContainer width={width} height={height}>
      {board.map((row, rowIdx) => (
        <TileRow key={rowIdx} height={height / board.length}>
          {row.map((col, colIdx) => (
            <TileCol
              key={colIdx}
              width={width / row.length}
              color={col.color}
            />
          ))}
        </TileRow>
      ))}
    </TileContainer>
  );
}
