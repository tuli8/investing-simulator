import { Stack } from "@mui/material";
import Input from "./Input";

const MONTHS_IN_YEAR = 12;

// TODO: make a dual input component with transformations from one field to the other and make them editable freely until confirmed.
const YieldInput = ({title, value, setValue}) => {
    const toMonthly = (annualy) => annualy ** (1/MONTHS_IN_YEAR);
    const toAnnualy = (monthly) => monthly ** MONTHS_IN_YEAR;
    const format = (number) => number.toFixed(3);

    const monthly = format(value);
    const annualy = format(toAnnualy(value));

    const setMonthly = (newMonthly) => {
        setValue(newMonthly);
    }

    const setAnnualy = (newAnnualy) => {
        setValue(toMonthly(newAnnualy));
    }

    // TODO: style better
    return <Stack direction={'row'} >
        {title}
        <Input title={'monthly'} value={monthly} type={'number'} setValue={setMonthly} />
        <Input title={'annualy'} value={annualy} type={'number'} setValue={setAnnualy} /> 
    </Stack>
}

export default YieldInput;
