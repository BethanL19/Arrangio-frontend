import { Heading } from "@chakra-ui/react";
import "./App.css";
import BoardsList from "./BoardsList";
import { useState } from "react";
import Board from "./Board";
import BoardInfo from "../interfaces/Board";

function App() {
    const [screen, setScreen] = useState("boardsList");
    const [board, setBoard] = useState<BoardInfo>();

    return (
        <div className="App">
            <Heading
                textTransform={"capitalize"}
                textAlign={"center"}
                margin={"4vh"}
            >
                Arrangio
            </Heading>
            {screen === "boardsList" && (
                <BoardsList setBoard={setBoard} setScreen={setScreen} />
            )}
            {screen === "board" && board && (
                <Board
                    board_id={board.board_id}
                    name={board.name}
                    setScreen={setScreen}
                />
            )}
        </div>
    );
}

export default App;
