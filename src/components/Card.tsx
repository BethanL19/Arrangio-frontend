import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import axios from "axios";
import EditCard from "./EditCard";
import CardInfo from "./CardInfo";

interface CardProps {
    name: string;
    card_id: number;
}

function Card({ name, card_id }: CardProps): JSX.Element {
    async function handleDelete() {
        const backend = "https://arrangio-backend.onrender.com/";

        await axios.delete(backend + `cards/${card_id}`);
    }

    return (
        <div className="card">
            <p>{name}</p>
            <div className="button-container">
                <CardInfo name={name} card_id={card_id} />
                <EditCard card_id={card_id} />
                <IconButton
                    icon={<DeleteIcon />}
                    aria-label="delete button"
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
}

export default Card;
