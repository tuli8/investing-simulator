import MultipleConnectedInput from "./MultipleConnectedInput";

const MONTHS_IN_YEAR = 12;

// TODO: make a dual input component with transformations from one field to the other and make them editable freely until confirmed.
const YieldInput = ({title, value, setValue}) => {
    const toMonthly = (annualy) => annualy ** (1/MONTHS_IN_YEAR);
    const toAnnualy = (monthly) => monthly ** MONTHS_IN_YEAR;
    const format = (number) => number.toFixed(3);

    return <MultipleConnectedInput title={title} value={value} setValue={setValue} inputs={[
        {
            title: 'monthly',
            key: 'monthly',
            type: 'number',
            fromValue: value => format(value),
            toValue: value => value,
        },
        {
            title: 'annually',
            key: 'annually',
            type: 'number',
            fromValue: value => format(toAnnualy(value)),
            toValue: value => toMonthly(value),
        }
    ]}/>
}

export default YieldInput;
