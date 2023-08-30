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
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";

interface AddCardProps {
    list_id: number;
}

function AddCard({ list_id }: AddCardProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");

    async function handleAddCard() {
        const backend = "https://arrangio-backend.onrender.com/";

        await axios.post(backend + "cards", { name: name, list_id: list_id });

        setName("");
        onClose();
    }

    return (
        <>
            <IconButton
                colorScheme="yellow"
                onClick={onOpen}
                icon={<AddIcon />}
                aria-label="add button"
                marginLeft={"1vw"}
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Add new Card!</DrawerHeader>

                    <DrawerBody>
                        <Input
                            value={name}
                            placeholder="Type here..."
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddCard} colorScheme="yellow">
                            Add
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default AddCard;
