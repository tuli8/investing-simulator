import React from "react";
import { Button, Stack } from "@mui/material";
import Input from "./Input";
import YieldInput from './YieldInput';
import PercentageWithMinimum from './PercentageWithMinimum';

const getComponentType = (type) => {
    switch(type) {
        case 'yield':
            return YieldInput;
        case 'percentageWithMinimum':
            return PercentageWithMinimum;
        default:
            return Input;
    }
}

const getParsingFunction = (type) => {
    switch(type) {
        case 'number': 
        case 'yield':
            return parseFloat;
        case 'percentageWithMinimum':
            return percentageWithMinimum => ({
                percentage: parseFloat(percentageWithMinimum.percentage),
                minimum: parseFloat(percentageWithMinimum.minimum),
            })
        default:
            return value => value; 
    }
}

const SimulationCard = ({options, setOptions, onRemove, fields}) => {
    return <Stack spacing={1}>
        <Button onClick={onRemove}>remove</Button>
        {fields.map(({title, optionsKey, type}) => {
            const componentType = getComponentType(type);
            const parsingFunction = getParsingFunction(type);

            return React.createElement(componentType, {
                title, 
                value: options[optionsKey], 
                setValue: newValue => setOptions({...options, [optionsKey]:parsingFunction(newValue)}), 
                key:title
            });
        })}
    </Stack>
}

export default SimulationCard;