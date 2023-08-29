import { useEffect, useState } from "react";
import BoardInfo from "../interfaces/Board";
import fetchBoards from "../utils/fetchBoards";
import BoardTile from "./BoardTile";
import AddBoard from "./AddBoard";

interface BoardsListProps {
    setScreen: React.Dispatch<React.SetStateAction<string>>;
    setBoard: React.Dispatch<React.SetStateAction<BoardInfo | undefined>>;
}

function BoardsList({ setScreen, setBoard }: BoardsListProps): JSX.Element {
    const [boards, setBoards] = useState<BoardInfo[]>([]);
    useEffect(() => {
        fetchBoards(setBoards);
    }, [boards]);

    return (
        <div className="boards-page">
            <AddBoard />
            <main className="boards-list">
                {boards.map((board: BoardInfo, index) => (
                    <BoardTile
                        name={board.name}
                        id={board.board_id}
                        key={index}
                        setScreen={setScreen}
                        setBoard={setBoard}
                    />
                ))}
            </main>
        </div>
    );
}

export default BoardsList;
