import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ListProps from "../interfaces/List";
import List from "./List";
import fetchLists from "../utils/fetchLists";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

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
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        // todo
    };
    return (
        <main>
            <div className="board-header">
                <Button
                    onClick={handleBackClick}
                    fontSize={"1.2rem"}
                    marginLeft={"16px"}
                >
                    ← Back
                </Button>
                <div></div>
                <Heading textAlign={"center"} marginBottom={"2vh"}>
                    {name}
                </Heading>
            </div>
            <div className="lists">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {lists.map((list) => (
                        <Droppable
                            droppableId={`${list.list_id}`}
                            key={`${list.list_id}`}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <List
                                        list_id={list.list_id}
                                        name={list.name}
                                        key={list.list_id}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </main>
    );
}

export default Board;
