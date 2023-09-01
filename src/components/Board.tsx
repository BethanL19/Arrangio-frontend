import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ListProps from "../interfaces/List";
import List from "./List";
import fetchLists from "../utils/fetchLists";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import ColourSelector from "./ColourSelector";
import ConfettiExplosion from "react-confetti-explosion";
import { useSound } from "use-sound";
import sound from "../sound.mp3";
import BoardProps from "../interfaces/BoardProps";

function Board({
    selectedBoard,
    setScreen,
    setBoards,
    setSelectedBoard,
    backendUrl,
}: BoardProps): JSX.Element {
    const [lists, setLists] = useState<ListProps[]>([]);
    const [isExploding, setIsExploding] = useState(false);
    const [play] = useSound(sound, {
        interrupt: true,
        volume: 0.5,
    });

    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    useEffect(() => {
        fetchLists(setLists, selectedBoard.board_id, backendUrl);
        console.log(lists.length);
    }, [lists, selectedBoard.board_id, backendUrl]);

    useEffect(() => {
        if (isExploding) {
            sleep(4000).then(() => setIsExploding(false));
        }
    }, [isExploding]);

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
            await axios.put(backendUrl + `cards/move/${draggableId}`, {
                list_id: parseInt(destination.droppableId),
            });

            if (destination.droppableId > source.droppableId) {
                setIsExploding(true);
                play();
            }
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
                    {selectedBoard.name}
                </Heading>

                <div>
                    <ColourSelector
                        board={selectedBoard}
                        setBoards={setBoards}
                        setBoard={setSelectedBoard}
                        backendUrl={backendUrl}
                    />
                </div>
            </div>
            <div className="confetti">
                {isExploding && (
                    <ConfettiExplosion
                        force={0.8}
                        duration={3000}
                        particleCount={250}
                        width={1600}
                    />
                )}
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
                                        board_colour={selectedBoard.colour}
                                        backendUrl={backendUrl}
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
