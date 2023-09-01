import { Card, Heading, CardBody } from "@chakra-ui/react";
import BoardInfo from "../interfaces/Board";

interface BoardTileProps {
    name: string;
    id: number;
    setScreen: React.Dispatch<React.SetStateAction<string>>;
    setSelectedBoard: React.Dispatch<
        React.SetStateAction<BoardInfo | undefined>
    >;
    colour: string;
}

function BoardTile({
    name,
    id,
    setScreen,
    setSelectedBoard,
    colour,
}: BoardTileProps): JSX.Element {
    function handleTileClick() {
        setSelectedBoard({ board_id: id, name: name, colour: colour });
        setScreen("board");
    }

    return (
        <Card
            className="board-tile"
            colorScheme={colour}
            onClick={handleTileClick}
        >
            <CardBody bg={colour} color="white">
                <Heading>{name}</Heading>
            </CardBody>
        </Card>
    );
}

export default BoardTile;
