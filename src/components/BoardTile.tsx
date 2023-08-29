import { Card, Heading, CardBody } from "@chakra-ui/react";
import BoardInfo from "../interfaces/Board";

interface BoardTileProps {
    name: string;
    id: number;
    setScreen: React.Dispatch<React.SetStateAction<string>>;
    setBoard: React.Dispatch<React.SetStateAction<BoardInfo | undefined>>;
}

function BoardTile({
    name,
    id,
    setScreen,
    setBoard,
}: BoardTileProps): JSX.Element {
    function handleTileClick() {
        setBoard({ board_id: id, name: name });
        setScreen("board");
    }

    return (
        <Card
            className="board-tile"
            colorScheme="teal"
            onClick={handleTileClick}
        >
            <CardBody bg="teal" color="white">
                <Heading>{name}</Heading>
            </CardBody>
        </Card>
    );
}

export default BoardTile;
