import { InfoOutlineIcon, SunIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    FormControl,
    FormLabel,
    Textarea,
    List,
    ListItem,
    ListIcon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import InputEdit from "./InputEdit";
import axios from "axios";
import fetchComments from "../utils/fetchComments";

interface CardInfoProps {
    name: string;
    card_id: number;
}

interface CommentProps {
    card_id: number;
    comment_id: number;
    text: string;
}

function CardInfo({ name, card_id }: CardInfoProps): JSX.Element {
    const [comment, setComment] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [comments, setComments] = useState<CommentProps[]>([]);

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    useEffect(() => {
        fetchComments(setComments, card_id);
    }, [comments, card_id]);

    async function handleAddComment() {
        const backend = "https://arrangio-backend.onrender.com/";

        await axios.post(backend + "comments", {
            card_id: card_id,
            text: comment,
        });
        setComment("");
        fetchComments(setComments, card_id);
    }

    return (
        <>
            <IconButton
                icon={<InfoOutlineIcon />}
                aria-label="info button"
                onClick={onOpen}
            />
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <InputEdit card_id={card_id} name={name} />
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Comments</FormLabel>
                            <Textarea
                                placeholder="Add comment..."
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            />
                            <Button
                                colorScheme="blue"
                                onClick={handleAddComment}
                                marginTop={"2vh"}
                            >
                                Add
                            </Button>
                        </FormControl>
                        <List spacing={3} marginTop={"4vh"}>
                            {comments.map((com) => (
                                <ListItem key={com.comment_id}>
                                    <ListIcon
                                        as={SunIcon}
                                        color={"yellow.500"}
                                    />
                                    {com.text}
                                </ListItem>
                            ))}
                        </List>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default CardInfo;
