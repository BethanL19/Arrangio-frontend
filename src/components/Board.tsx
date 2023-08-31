import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ListProps from "../interfaces/List";
import List from "./List";
import fetchLists from "../utils/fetchLists";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import axios from "axios";

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
    async function handleDragEnd(result: DropResult) {
        const { destination, source, draggableId } = result;

        if (!result.destination) {
            return;
        }
        if (
            destination!.droppableId === source.droppableId &&
            destination!.index === source.index
        ) {
            return;
        }
        if (destination !== undefined && destination !== null) {
            const backend = "https://arrangio-backend.onrender.com/";

            await axios.put(backend + `cards/move/${draggableId}`, {
                list_id: parseInt(destination.droppableId),
            });
        }
    }
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
