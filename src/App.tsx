import styled from "styled-components";
import { Tiles } from "./components";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function App() {
  return (
    <AppContainer>
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
    </AppContainer>
  );
}
