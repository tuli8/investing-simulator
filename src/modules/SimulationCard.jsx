import { Button, Stack } from "@mui/material";
import Input from "./Input";
import YieldInput from './YieldInput';

const SimulationCard = ({options, setOptions, onRemove, fields}) => {
    return <Stack spacing={1}>
        <Button onClick={onRemove}>remove</Button>
        {fields.map(({title, optionsKey, type}) => (
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