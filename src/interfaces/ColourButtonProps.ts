import BoardInfo from "./Board";

interface ColourButtonProps {
    board: BoardInfo;
    setBoards: React.Dispatch<React.SetStateAction<BoardInfo[]>>;
    setBoard: React.Dispatch<React.SetStateAction<BoardInfo | undefined>>;
    backendUrl: string;
}

export default ColourButtonProps;
