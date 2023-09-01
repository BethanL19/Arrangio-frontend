import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Input,
    IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";

interface EditCommentProps {
    comment_id: number;
    comment_text: string;
    backendUrl: string;
}

function EditComment({
    comment_id,
    comment_text,
    backendUrl,
}: EditCommentProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [text, setText] = useState(comment_text);

    async function handleEditComment() {
        await axios.put(backendUrl + `comments/${comment_id}`, { text: text });

        setText("");
        onClose();
    }

    return (
        <>
            <IconButton
                colorScheme="yellow"
                onClick={onOpen}
                icon={<EditIcon />}
                aria-label="Edit button"
                marginLeft={"0.5vw"}
                marginRight={"0.5vw"}
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Edit Comment!</DrawerHeader>

                    <DrawerBody>
                        <Input
                            value={text}
                            placeholder="Type here..."
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                        />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEditComment}
                            colorScheme="yellow"
                        >
                            Edit
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default EditComment;
