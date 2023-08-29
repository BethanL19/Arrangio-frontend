import axios from "axios";
import CardInfo from "../interfaces/Card";

async function fetchCards(
    setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>,
    list_id: number
) {
    const backend = "https://arrangio-backend.onrender.com/";

    const response = await axios.get(backend + `cards/${list_id}`);

    setCards(response.data);
}

export default fetchCards;
