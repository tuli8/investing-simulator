import { Stack } from "@mui/material";
import Input from "./Input"

// TODO: make percentage input show the percentage, add validation (value <100) and make it behave like a percentage and not like a fraction (now 100% is 1 in the field)
const PercentageWithMinimum = ({title, value, setValue}) => {
    return <Stack direction={'row'} >
        {title}
        <Input title={'percentage'} type={'number'} value={value.percentage} setValue={newValue => setValue({...value, percentage: newValue})}/>
        <Input title={'minimum'} type={'number'} value={value.minimum} setValue={newValue => setValue({...value, minimum: newValue})}/>
    </Stack>
}

export default PercentageWithMinimum;