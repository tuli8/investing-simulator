import React from "react";
import Input from "./Input";
import YieldInput from './YieldInput';
import PercentageWithMinimum from './PercentageWithMinimum';
import BooleanField from "./BooleanField";
import TimeFrameInput from "./TimeFrameInput";


// TODO: extract component and parsing to the top level field declaration
const getComponentType = (type) => {
    switch(type) {
        case 'yield':
            return YieldInput;
        case 'percentageWithMinimum':
            return PercentageWithMinimum;
        case 'boolean': 
            return BooleanField;
        case 'timeFrame':
            return TimeFrameInput;
        default:
            return Input;
    }
}

const getParsingFunction = (type) => {
    switch(type) {
        case 'number': 
        case 'yield':
        case 'timeFrame':
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

const GenericInput = ({title, options, setOptions, optionsKey, type}) => {
    const componentType = getComponentType(type);
    const parsingFunction = getParsingFunction(type);

    const setValue = newValue => setOptions( options => ({...options, [optionsKey]:parsingFunction(newValue)}));

    return React.createElement(componentType, {
        title, 
        value: options[optionsKey], 
        setValue, 
    });
};

export default GenericInput;