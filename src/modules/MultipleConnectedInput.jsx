import { Stack } from "@mui/material";
import Input from "./Input";

const MultipleConnectedInput = ({title, value, setValue, inputs}) => {
    return <Stack direction={'row'} >
        {title}
        {inputs.map(input => 
            <Input title={input.title} value={input.fromValue(value)} type={input.type} setValue={newValue => setValue(input.toValue(newValue))} key={input.key}/>
        )}
    </Stack>
}

export default MultipleConnectedInput;
