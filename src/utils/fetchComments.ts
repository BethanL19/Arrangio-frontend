import CommentProps from "../interfaces/CommentProps";
import axios from "axios";

async function fetchComments(
    setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>,
    card_id: number,
    backendUrl: string
) {
    const response = await axios.get(backendUrl + `comments/${card_id}`);
    setComments(response.data);
}

export default fetchComments;
