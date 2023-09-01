import "./App.css";
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import BoardsList from "./BoardsList";
import Board from "./Board";
import BoardInfo from "../interfaces/Board";

const backendUrl = "https://arrangio-backend.onrender.com/";

function App() {
    const [screen, setScreen] = useState("boardsList");
    const [selectedBoard, setSelectedBoard] = useState<BoardInfo>();
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
                    setSelectedBoard={setSelectedBoard}
                    setScreen={setScreen}
                    boards={boards}
                    setBoards={setBoards}
                    backendUrl={backendUrl}
                />
            )}
            {screen === "board" && selectedBoard && (
                <Board
                    selectedBoard={selectedBoard}
                    setScreen={setScreen}
                    setBoards={setBoards}
                    setSelectedBoard={setSelectedBoard}
                    backendUrl={backendUrl}
                />
            )}
        </div>
    );
}

export default App;
