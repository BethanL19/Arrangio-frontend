import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
    Editable,
    EditableInput,
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    Flex,
    Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface InputEditProps {
    card_id: number;
    name: string;
}

function InputEdit({ card_id, name }: InputEditProps): JSX.Element {
    const [inputValue, setInputValue] = useState(name);

    async function handleEditCard() {
        const backend = "https://arrangio-backend.onrender.com/";

        await axios.put(backend + `cards/${card_id}`, { name: inputValue });
    }
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();
        console.log(getSubmitButtonProps);
        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton
                    icon={<CheckIcon />}
                    {...getSubmitButtonProps()}
                    aria-label="check button"
                    onClick={handleEditCard}
                />
                <IconButton
                    icon={<CloseIcon />}
                    {...getCancelButtonProps()}
                    aria-label="close button"
                />
            </ButtonGroup>
        ) : (
            <Flex justifyContent="center">
                <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    {...getEditButtonProps()}
                    aria-label="edit button"
                />
            </Flex>
        );
    }

    return (
        <Editable
            textAlign="center"
            defaultValue={inputValue}
            fontSize="2xl"
            isPreviewFocusable={false}
        >
            <EditablePreview />
            <Input
                as={EditableInput}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
            <EditableControls />
        </Editable>
    );
}

export default InputEdit;
