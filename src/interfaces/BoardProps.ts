import BoardInfo from "./Board";

interface BoardProps {
    selectedBoard: BoardInfo;
    setScreen: React.Dispatch<React.SetStateAction<string>>;
    setBoards: React.Dispatch<React.SetStateAction<BoardInfo[]>>;
    setSelectedBoard: React.Dispatch<
        React.SetStateAction<BoardInfo | undefined>
    >;
    backendUrl: string;
}

export default BoardProps;
