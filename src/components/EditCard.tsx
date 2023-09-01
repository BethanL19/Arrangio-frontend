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
import EditCardProps from "../interfaces/EditCardProps";

function EditCard({
    card_id,
    backendUrl,
    card_name,
}: EditCardProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState(card_name);

    async function handleEditCard() {
        if (name.length === 0) {
            window.alert("Name can't be blank!");
            return;
        }

        await axios.put(backendUrl + `cards/${card_id}`, { name: name });

        setName("");
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
                    <DrawerHeader>Edit Card!</DrawerHeader>

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
                        <Button onClick={handleEditCard} colorScheme="yellow">
                            Edit
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default EditCard;
