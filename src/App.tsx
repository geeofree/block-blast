import { Tiles } from "./components";

export function App() {
  return (
    <Tiles
      width={512}
      height={512}
      board={[
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, { color: "red" }],
        [{}, {}, {}, {}, {}, {}, {}, { color: "red" }],
        [{}, {}, {}, {}, {}, {}, {}, { color: "red" }],
        [{}, {}, {}, {}, {}, {}, {}, { color: "red" }],
        [{}, {}, { color: "blue" }, { color: "blue" }, {}, {}, {}, {}],
        [{}, {}, {}, { color: "blue" }, { color: "blue" }, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
      ]}
    />
  );
}
