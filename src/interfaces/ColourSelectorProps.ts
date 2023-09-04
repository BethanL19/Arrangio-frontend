import BoardInfo from "./Board";

interface ColourSelectorProps {
    board: BoardInfo;
    setBoards: React.Dispatch<React.SetStateAction<BoardInfo[]>>;
    setBoard: React.Dispatch<React.SetStateAction<BoardInfo | undefined>>;
    backendUrl: string;
}

export default ColourSelectorProps;
