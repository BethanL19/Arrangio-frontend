import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import fetchBoards from "../utils/fetchBoards";
import BoardInfo from "../interfaces/Board";

const colours = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
];
interface ColourButtonProps {
    board: BoardInfo;
    setBoards: React.Dispatch<React.SetStateAction<BoardInfo[]>>;
    setBoard: React.Dispatch<React.SetStateAction<BoardInfo | undefined>>;
}
function ColourButtons({
    board,
    setBoards,
    setBoard,
}: ColourButtonProps): JSX.Element {
    const [_selectedColour, setSelectedColour] = useState(board.colour);

    async function handleUpdateColour(board: BoardInfo, colour: string) {
        setSelectedColour(colour);
        const backend = "https://arrangio-backend.onrender.com/";

        await axios.put(backend + `boards/${board.board_id}`, {
            colour: colour,
        });
        fetchBoards(setBoards);
        setBoard({
            board_id: board.board_id,
            name: board.name,
            colour: colour,
        });
    }

    const colourButtons = colours.map((colour, index) => (
        <Button
            colorScheme={colour}
            key={index}
            onClick={() => handleUpdateColour(board, colour)}
        ></Button>
    ));
    return <>{colourButtons}</>;
}
export default ColourButtons;
