import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import fetchBoards from "../utils/fetchBoards";
import ColourButtonProps from "../interfaces/ColourButtonProps";
import BoardInfo from "../interfaces/Board";

function ColourButtons({
    board,
    setBoards,
    setBoard,
    backendUrl,
}: ColourButtonProps): JSX.Element {
    const [_selectedColour, setSelectedColour] = useState(board.colour);
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

    async function handleUpdateColour(board: BoardInfo, colour: string) {
        setSelectedColour(colour);

        await axios.put(backendUrl + `boards/${board.board_id}`, {
            colour: colour,
        });
        fetchBoards(setBoards, backendUrl);
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
