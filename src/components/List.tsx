import { Heading } from "@chakra-ui/react";
import CardInfo from "../interfaces/Card";
import { useState, useEffect } from "react";
import Card from "./Card";
import ListProps from "../interfaces/List";
import fetchCards from "../utils/fetchCards";
import AddCard from "./AddCard";
import { Draggable } from "react-beautiful-dnd";

function List({ list_id, name }: ListProps): JSX.Element {
    const [cards, setCards] = useState<CardInfo[]>([]);

    useEffect(() => {
        fetchCards(setCards, list_id);
    }, [cards, list_id]);

    return (
        <div className="list">
            <div className="list-header">
                <Heading marginBottom={"1vh"} marginRight={"1vw"}>
                    {name}
                </Heading>
                <AddCard list_id={list_id} />
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
                            />
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    );
}

export default List;
