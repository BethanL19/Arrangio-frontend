import CommentProps from "../interfaces/CommentProps";
import axios from "axios";

async function fetchComments(
    setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>,
    card_id: number
) {
    const backend = "https://arrangio-backend.onrender.com/";

    const response = await axios.get(backend + `comments/${card_id}`);
    setComments(response.data);
}

export default fetchComments;
