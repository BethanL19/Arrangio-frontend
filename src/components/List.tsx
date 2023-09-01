import { Heading } from "@chakra-ui/react";
import CardInfo from "../interfaces/Card";
import { useState, useEffect } from "react";
import Card from "./Card";
import fetchCards from "../utils/fetchCards";
import AddCard from "./AddCard";
import { Draggable } from "react-beautiful-dnd";
import ListWithColourProps from "../interfaces/ListWithColourProps";

function List({
    list_id,
    name,
    board_colour,
    backendUrl,
}: ListWithColourProps): JSX.Element {
    const [cards, setCards] = useState<CardInfo[]>([]);

    useEffect(() => {
        fetchCards(setCards, list_id, backendUrl);
    }, [cards, list_id, backendUrl]);

    return (
        <div className="list" style={{ backgroundColor: board_colour }}>
            <div className="list-header">
                <Heading marginBottom={"1vh"} marginRight={"1vw"}>
                    {name}
                </Heading>
                <AddCard list_id={list_id} backendUrl={backendUrl} />
            </div>
            {cards.map((card: CardInfo, index) => (
                <Draggable
                    key={`${card.card_id}`}
                    draggableId={`${card.card_id}`}
                    index={index}
                >
                    {(provided) => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <Card
                                name={card.name}
                                key={card.card_id}
                                card_id={card.card_id}
                                backendUrl={backendUrl}
                            />
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    );
}

export default List;
