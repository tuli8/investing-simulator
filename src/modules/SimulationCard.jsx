import Input from "./Input";

const inputs = [
    {
        title: 'exponent',
        optionsKey: 'exponent',
        type: 'number',
    },
    {
        title: 'initial value',
        optionsKey: 'initial',
        type: 'number',
    },
];

const SimulationCard = ({options, setOptions}) => {
    return <div>
        {inputs.map(({title, optionsKey, type}) => (
            <Input title={title} value={options[optionsKey]} type={type} setValue={newValue => setOptions({...options, [optionsKey]:parseFloat(newValue)})} />
        ))}
    </div>
}

export default SimulationCard;