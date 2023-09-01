import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import ColourButtons from "./Colours";
import BoardInfo from "../interfaces/Board";

interface ColourSelectorProps {
    board: BoardInfo;
    setBoards: React.Dispatch<React.SetStateAction<BoardInfo[]>>;
    setBoard: React.Dispatch<React.SetStateAction<BoardInfo | undefined>>;
    backendUrl: string;
}

function ColourSelector({
    board,
    setBoards,
    setBoard,
    backendUrl,
}: ColourSelectorProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                colorScheme={"yellow"}
                onClick={onOpen}
                icon={<EditIcon />}
                aria-label="add button"
                marginLeft={"1vw"}
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Change board colour!</DrawerHeader>

                    <DrawerBody>
                        <ColourButtons
                            board={board}
                            setBoards={setBoards}
                            setBoard={setBoard}
                            backendUrl={backendUrl}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default ColourSelector;
