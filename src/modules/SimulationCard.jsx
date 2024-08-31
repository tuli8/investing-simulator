import { Button, Stack } from "@mui/material";
import Input from "./Input";
import YieldInput from './YieldInput';

const inputs = [
    {
        title: 'name',
        optionsKey: 'name',
        type: 'text',
    },
    {
        title: 'yield',
        optionsKey: 'exponent',
        type: 'yield',
    },
    {
        title: 'initial value',
        optionsKey: 'initial',
        type: 'number',
    },
    {
        title: 'monthly investment',
        optionsKey: 'monthlyInvestment',
        type: 'number',
    }
];

const SimulationCard = ({options, setOptions, onRemove}) => {
    return <Stack spacing={1}>
        <Button onClick={onRemove}>remove</Button>
        {inputs.map(({title, optionsKey, type}) => (
            type==='yield'? (
                <YieldInput title={title} value={options[optionsKey]} setValue={newValue => setOptions({...options, [optionsKey]:parseFloat(newValue)})} key={title}/>
            ) : (
                <Input title={title} value={options[optionsKey]} type={type} setValue={newValue => 
                    setOptions({...options, [optionsKey]:(type==='number'?parseFloat(newValue): newValue)})} 
                    key={title}/>
            )
        ))}
    </Stack>
}

export default SimulationCard;