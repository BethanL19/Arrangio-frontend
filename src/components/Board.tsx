import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ListProps from "../interfaces/List";
import List from "./List";
import fetchLists from "../utils/fetchLists";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import ColourSelector from "./ColourSelector";
import BoardInfo from "../interfaces/Board";
import ConfettiExplosion from "react-confetti-explosion";
import { useSound } from "use-sound";
import sound from "../sound.mp3";

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
    const [isExploding, setIsExploding] = useState(false);
    const [play] = useSound(sound, {
        interrupt: true,
        volume: 0.5,
    });

    useEffect(() => {
        fetchLists(setLists, board.board_id);
        console.log(lists.length);
    }, [lists, board.board_id]);

    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
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
            const backend = "https://arrangio-backend.onrender.com/";

            await axios.put(backend + `cards/move/${draggableId}`, {
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
