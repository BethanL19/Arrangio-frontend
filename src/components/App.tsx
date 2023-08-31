import { Heading } from "@chakra-ui/react";
import "./App.css";
import BoardsList from "./BoardsList";
import { useState } from "react";
import Board from "./Board";
import BoardInfo from "../interfaces/Board";

function App() {
    const [screen, setScreen] = useState("boardsList");
    const [board, setBoard] = useState<BoardInfo>();
    const [boards, setBoards] = useState<BoardInfo[]>([]);

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
                <BoardsList
                    setBoard={setBoard}
                    setScreen={setScreen}
                    boards={boards}
                    setBoards={setBoards}
                />
            )}
            {screen === "board" && board && (
                <Board
                    board={board}
                    setScreen={setScreen}
                    setBoards={setBoards}
                    setBoard={setBoard}
                />
            )}
        </div>
    );
}

export default App;
