import { DeleteIcon, InfoOutlineIcon, SunIcon } from "@chakra-ui/icons";
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
    Editable,
    EditableTextarea,
    EditablePreview,
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
    const [addComment, setAddComment] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [comments, setComments] = useState<CommentProps[]>([]);

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    useEffect(() => {
        fetchComments(setComments, card_id);
    }, [card_id]);

    async function handleAddComment() {
        const backend = "https://arrangio-backend.onrender.com/";

        await axios.post(backend + "comments", {
            card_id: card_id,
            text: addComment,
        });
        setAddComment("");
        fetchComments(setComments, card_id);
    }

    async function handleDeleteComment(comment_id: number) {
        const backend = "https://arrangio-backend.onrender.com/";

        await axios.delete(backend + `comments/${comment_id}`);
        fetchComments(setComments, card_id);
    }

    async function handleSubmitComment(id: number, text: string) {
        const backend = "https://arrangio-backend.onrender.com/";

        await axios.put(backend + `comments/${id}`, { text: text });
        fetchComments(setComments, card_id);
    }

    function handleEditComment(id: number, text: string) {
        const updatedComments: CommentProps[] = [];
        for (const com of comments) {
            if (com.comment_id !== id) {
                updatedComments.push(com);
            } else {
                const newComment = com;
                newComment.text = text;
                updatedComments.push(newComment);
            }
        }

        setComments(updatedComments);
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
                                value={addComment}
                                onChange={(e) => {
                                    setAddComment(e.target.value);
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

                                    <Editable
                                        value={com.text}
                                        onChange={(e) => {
                                            handleEditComment(
                                                com.comment_id,
                                                e
                                            );
                                        }}
                                        onSubmit={(e) => {
                                            handleSubmitComment(
                                                com.comment_id,
                                                e
                                            );
                                        }}
                                    >
                                        <EditablePreview />
                                        <EditableTextarea />
                                    </Editable>
                                    <IconButton
                                        icon={<DeleteIcon />}
                                        colorScheme={"red"}
                                        aria-label="delete button"
                                        onClick={() => {
                                            handleDeleteComment(com.comment_id);
                                        }}
                                    />
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
