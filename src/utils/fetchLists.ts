import ListProps from "../interfaces/List";
import axios from "axios";

async function fetchLists(
    setLists: React.Dispatch<React.SetStateAction<ListProps[]>>,
    board_id: number
) {
    const backendUrl = "https://arrangio-backend.onrender.com/";

    const response = await axios.get(backendUrl + `lists/${board_id}`);

    setLists(response.data);
}

export default fetchLists;
