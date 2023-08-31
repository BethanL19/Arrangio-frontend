import { useEffect } from "react";
import BoardInfo from "../interfaces/Board";
import fetchBoards from "../utils/fetchBoards";
import BoardTile from "./BoardTile";
import AddBoard from "./AddBoard";

interface BoardsListProps {
    setScreen: React.Dispatch<React.SetStateAction<string>>;
    setBoard: React.Dispatch<React.SetStateAction<BoardInfo | undefined>>;
    boards: BoardInfo[];
    setBoards: React.Dispatch<React.SetStateAction<BoardInfo[]>>;
}

function BoardsList({
    setScreen,
    setBoard,
    boards,
    setBoards,
}: BoardsListProps): JSX.Element {
    useEffect(() => {
        fetchBoards(setBoards);
    }, [boards, setBoards]);

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
                        colour={board.colour}
                    />
                ))}
            </main>
        </div>
    );
}

export default BoardsList;
