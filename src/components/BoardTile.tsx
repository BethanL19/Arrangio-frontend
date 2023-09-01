import { Card, Heading, CardBody } from "@chakra-ui/react";
import BoardTileProps from "../interfaces/BoardTileProps";

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
