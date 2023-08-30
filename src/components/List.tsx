import { Heading } from "@chakra-ui/react";
import CardInfo from "../interfaces/Card";
import { useState, useEffect } from "react";
import Card from "./Card";
import ListProps from "../interfaces/List";
import fetchCards from "../utils/fetchCards";
import AddCard from "./AddCard";

function List({ list_id, name }: ListProps): JSX.Element {
    const [cards, setCards] = useState<CardInfo[]>([]);

    useEffect(() => {
        fetchCards(setCards, list_id);
    }, [cards, list_id]);

    return (
        <div className="list">
            <Heading>{name}</Heading>
            <AddCard list_id={list_id} />
            {cards.map((card: CardInfo) => (
                <Card name={card.name} key={card.card_id} />
            ))}
        </div>
    );
}

export default List;
