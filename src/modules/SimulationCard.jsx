import React from "react";
import { Button, Stack } from "@mui/material";
import GenericInput from "./GenericInput";

const SimulationCard = ({options, setOptions, onRemove, fields}) => {
    return <Stack spacing={1}>
        <Button onClick={onRemove}>remove</Button>
        {fields.map(fieldSettings => <GenericInput {...fieldSettings} options={options} setOptions={setOptions} key={fieldSettings.title}/>)}
    </Stack>
}

export default SimulationCard;