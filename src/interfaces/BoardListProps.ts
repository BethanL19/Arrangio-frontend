import BoardInfo from "./Board";

interface BoardsListProps {
    setScreen: React.Dispatch<React.SetStateAction<string>>;
    setSelectedBoard: React.Dispatch<
        React.SetStateAction<BoardInfo | undefined>
    >;
    boards: BoardInfo[];
    setBoards: React.Dispatch<React.SetStateAction<BoardInfo[]>>;
    backendUrl: string;
}

export default BoardsListProps;
