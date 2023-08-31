import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ListProps from "../interfaces/List";
import List from "./List";
import fetchLists from "../utils/fetchLists";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import ColourSelector from "./ColourSelector";
import BoardInfo from "../interfaces/Board";

interface BoardProps {
    board: BoardInfo;
    setScreen: React.Dispatch<React.SetStateAction<string>>;
    setBoards: React.Dispatch<React.SetStateAction<BoardInfo[]>>;
    setBoard: React.Dispatch<React.SetStateAction<BoardInfo | undefined>>;
}

function Board({
    board,
    setScreen,
    setBoards,
    setBoard,
}: BoardProps): JSX.Element {
    const [lists, setLists] = useState<ListProps[]>([]);

    useEffect(() => {
        fetchLists(setLists, board.board_id);
        console.log(lists.length);
    }, [lists, board.board_id]);

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
                    {board.name}
                </Heading>
                <div>
                    <ColourSelector
                        board={board}
                        setBoards={setBoards}
                        setBoard={setBoard}
                    />
                </div>
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
                                        board_colour={board.colour}
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
