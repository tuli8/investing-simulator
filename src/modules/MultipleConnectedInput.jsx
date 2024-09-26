import { Stack } from "@mui/material";
import ConfirmableInput from "./ConfirmableInput";

const MultipleConnectedInput = ({title, value, setValue, inputs}) => {
    return <Stack direction={'row'} >
        {title}
        {inputs.map(input => 
            <ConfirmableInput title={input.title} value={input.fromValue(value)} type={input.type} 
                setValue={newValue => setValue(input.toValue(newValue))} key={input.key}/>
        )}
    </Stack>
}

export default MultipleConnectedInput;
