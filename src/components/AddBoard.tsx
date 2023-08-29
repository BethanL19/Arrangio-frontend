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
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function AddBoard(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");

    async function handleAddBoard() {
        const backend = "https://arrangio-backend.onrender.com/";

        const response = await axios.post(backend + "boards", { name: name });

        await axios.post(backend + "lists", {
            board_id: response.data[0].board_id,
            name: "To-Do",
        });
        await axios.post(backend + "lists", {
            board_id: response.data[0].board_id,
            name: "Doing",
        });
        await axios.post(backend + "lists", {
            board_id: response.data[0].board_id,
            name: "Done",
        });

        setName("");
    }

    return (
        <>
            <Button
                colorScheme="yellow"
                onClick={onOpen}
                textTransform={"capitalize"}
            >
                Add new Board
            </Button>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Add new board!</DrawerHeader>

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
                        <Button onClick={handleAddBoard} colorScheme="yellow">
                            Add
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default AddBoard;
