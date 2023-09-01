import BoardInfo from "./Board";

interface BoardTileProps {
    name: string;
    id: number;
    setScreen: React.Dispatch<React.SetStateAction<string>>;
    setSelectedBoard: React.Dispatch<
        React.SetStateAction<BoardInfo | undefined>
    >;
    colour: string;
}

export default BoardTileProps;
