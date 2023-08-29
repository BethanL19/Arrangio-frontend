import axios from "axios";
import Board from "../interfaces/Board";

async function fetchBoards(
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>
) {
    const backend = "https://arrangio-backend.onrender.com/";

    const response = await axios.get(backend + "boards");

    setBoards(response.data);
}

export default fetchBoards;
