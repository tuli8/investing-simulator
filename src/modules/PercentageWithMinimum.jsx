import { Stack } from "@mui/material";
import Input from "./Input"

const PercentageWithMinimum = ({title, value, setValue}) => {
    return <Stack direction={'row'} >
        {title}
        <Input title={'percentage'} type={'number'} value={value.percentage} setValue={newValue => setValue({...value, percentage: newValue})}/>
        <Input title={'minimum'} type={'number'} value={value.minimum} setValue={newValue => setValue({...value, minimum: newValue})}/>
    </Stack>
}

export default PercentageWithMinimum;