import { useEffect, useState } from "react";
import Board from "../interfaces/Board";
import fetchBoards from "../utils/fetchBoards";
import BoardTile from "./BoardTile";
import AddBoard from "./AddBoard";

function BoardsList(): JSX.Element {
    const [boards, setBoards] = useState<Board[]>([]);
    useEffect(() => {
        fetchBoards(setBoards);
    }, [boards]);

    return (
        <main className="boards-list">
            <AddBoard />
            {boards.map((board: Board) => (
                <BoardTile name={board.name} key={board.id} />
            ))}
        </main>
    );
}

export default BoardsList;
