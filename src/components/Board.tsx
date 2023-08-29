import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ListProps from "../interfaces/List";
import List from "./List";
import fetchLists from "../utils/fetchLists";

interface BoardProps {
    board_id: number;
    name: string;
    setScreen: React.Dispatch<React.SetStateAction<string>>;
}

function Board({ board_id, name, setScreen }: BoardProps): JSX.Element {
    const [lists, setLists] = useState<ListProps[]>([]);

    useEffect(() => {
        fetchLists(setLists, board_id);
        console.log(lists.length);
    }, [lists, board_id]);

    function handleBackClick() {
        setScreen("boardsList");
    }
    return (
        <main>
            <Button onClick={handleBackClick}>Back</Button>
            <Heading>{name}</Heading>
            {lists.map((list) => (
                <List
                    list_id={list.list_id}
                    name={list.name}
                    key={list.list_id}
                />
            ))}
        </main>
    );
}

export default Board;
