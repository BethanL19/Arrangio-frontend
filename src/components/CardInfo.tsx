import { InfoOutlineIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useRef } from "react";
import InputEdit from "./InputEdit";

interface CardInfoProps {
    name: string;
    card_id: number;
}

function CardInfo({ name, card_id }: CardInfoProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    function handleAddComment() {
        ("");
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
                            <Textarea placeholder="Add comment..." />
                            <Button
                                colorScheme="blue"
                                onClick={handleAddComment}
                            >
                                Add
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default CardInfo;
