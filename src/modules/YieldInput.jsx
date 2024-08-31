import { useState } from "react";
import Input from "./Input";
import { Stack } from "@mui/material";

const MONTHS_IN_YEAR = 12;

const YieldInput = ({title, value, setValue}) => {
    const [lastSetValue, setLastSetValue] = useState(value);
    const [wasLasSetMonthly, setWasLastSetMonthly] = useState(true);

    const toMonthly = (annualy) => annualy ** (1/MONTHS_IN_YEAR);
    const toAnnualy = (monthly) => monthly ** MONTHS_IN_YEAR;
    const format = (number) => number.toFixed(3);

    const monthly = wasLasSetMonthly? lastSetValue: format(toMonthly(lastSetValue));
    const annualy = !wasLasSetMonthly? lastSetValue: format(toAnnualy(lastSetValue));

    const setMonthly = (newMonthly) => {
        setValue(newMonthly);
        setLastSetValue(newMonthly);
        setWasLastSetMonthly(true);
    }

    const setAnnualy = (newAnnualy) => {
        setValue(toMonthly(newAnnualy));
        setLastSetValue(newAnnualy);
        setWasLastSetMonthly(false);
    }

    // TODO: style better
    return <Stack direction={'row'} >
        {title}
        <Input title={'monthly'} value={monthly} type={'number'} setValue={setMonthly} />
        <Input title={'annualy'} value={annualy} type={'number'} setValue={setAnnualy} /> 
    </Stack>
}

export default YieldInput;
