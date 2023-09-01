import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
    Editable,
    EditableInput,
    EditablePreview,
    ButtonGroup,
    IconButton,
    Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import InputEditProps from "../interfaces/InputEditProps";

function InputEdit({ card_id, name, backendUrl }: InputEditProps): JSX.Element {
    const [inputValue, setInputValue] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    async function handleEditCard() {
        if (inputValue.length === 0) {
            window.alert("Name can't be blank!");
            return;
        }

        await axios.put(backendUrl + `cards/${card_id}`, { name: inputValue });
        setIsEditing(false);
    }
    function handleStartEditing() {
        setIsEditing(true);
    }
    function handleCancelEditing() {
        setIsEditing(false);
    }
    function EditableControls() {
        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton
                    icon={<CheckIcon />}
                    aria-label="check button"
                    onClick={handleEditCard}
                />
                <IconButton
                    icon={<CloseIcon />}
                    aria-label="close button"
                    onClick={handleCancelEditing}
                />
            </ButtonGroup>
        ) : (
            <Flex justifyContent="center">
                <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    aria-label="edit button"
                    onClick={handleStartEditing}
                />
            </Flex>
        );
    }

    return (
        <Editable
            textAlign="center"
            fontSize="2xl"
            isPreviewFocusable={isEditing}
            value={inputValue}
            onChange={(e) => setInputValue(e)}
            onSubmit={handleEditCard}
        >
            <EditablePreview />
            <EditableInput />
            <EditableControls />
        </Editable>
    );
}

export default InputEdit;
