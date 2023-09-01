import { useEffect } from "react";
import BoardInfo from "../interfaces/Board";
import fetchBoards from "../utils/fetchBoards";
import BoardTile from "./BoardTile";
import AddBoard from "./AddBoard";
import BoardsListProps from "../interfaces/BoardListProps";

function BoardsList({
    setScreen,
    setSelectedBoard,
    boards,
    setBoards,
    backendUrl,
}: BoardsListProps): JSX.Element {
    useEffect(() => {
        fetchBoards(setBoards);
    }, [boards, setBoards]);

    return (
        <div className="boards-page">
            <AddBoard backendUrl={backendUrl} />
            <main className="boards-list">
                {boards.map((board: BoardInfo, index) => (
                    <BoardTile
                        name={board.name}
                        id={board.board_id}
                        key={index}
                        setScreen={setScreen}
                        setSelectedBoard={setSelectedBoard}
                        colour={board.colour}
                    />
                ))}
            </main>
        </div>
    );
}

export default BoardsList;
