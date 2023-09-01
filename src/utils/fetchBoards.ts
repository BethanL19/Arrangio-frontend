import axios from "axios";
import Board from "../interfaces/Board";

async function fetchBoards(
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>
) {
    const backendUrl = "https://arrangio-backend.onrender.com/";

    const response = await axios.get(backendUrl + "boards");

    setBoards(response.data);
}

export default fetchBoards;
