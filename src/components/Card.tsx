import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import axios from "axios";
import EditCard from "./EditCard";
import CardInfo from "./CardInfo";
import CardProps from "../interfaces/CardProps";

function Card({ name, card_id, backendUrl }: CardProps): JSX.Element {
    async function handleDelete() {
        await axios.delete(backendUrl + `cards/${card_id}`);
    }

    return (
        <div className="card">
            <p>{name}</p>
            <div className="button-container">
                <CardInfo
                    name={name}
                    card_id={card_id}
                    backendUrl={backendUrl}
                />
                <EditCard card_id={card_id} backendUrl={backendUrl} />
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
