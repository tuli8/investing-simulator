import MultipleConnectedInput from "./MultipleConnectedInput";

const MONTHS_IN_YEAR = 12;

const TimeFrameInput = ({title, value, setValue}) => {
    const toMonths = years => Math.floor(years * MONTHS_IN_YEAR);
    const toYears = months => months / MONTHS_IN_YEAR;
    const format = (number) => number.toFixed(3);

    return <MultipleConnectedInput title={title} value={value} setValue={setValue} inputs={[
        {
            title: 'months',
            key: 'months',
            type: 'number',
            fromValue: value => value,
            toValue: value => value,
        },
        {
            title: 'years',
            key: 'years',
            type: 'number',
            fromValue: value => format(toYears(value)),
            toValue: value => toMonths(value),
        }
    ]}/>
}

export default TimeFrameInput;