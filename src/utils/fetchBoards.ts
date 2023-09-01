import axios from "axios";
import Board from "../interfaces/Board";

async function fetchBoards(
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>,
    backendUrl: string
) {
    const response = await axios.get(backendUrl + "boards");

    setBoards(response.data);
}

export default fetchBoards;
