import Input from "./Input";
import SimulationCard from "./SimulationCard";
import './SidePanel.css';

const overallOptions = [
    {
        title: 'months simulated',
        optionsKey: 'months',
        type: 'number',
    },
];

const SidePanel = ({options, setOptions}) => {

    const lastSimulationKey = Math.max(...Object.keys(options.simulations));

    const addSimulation = () => {
        setOptions({...options, simulations: {...options.simulations, [lastSimulationKey+1]:{initial:1000, exponent:1}}})
    }

    return <div className="sidePanel">
        {
            overallOptions.map(({title, optionsKey, type}) => (
                <Input title={title} value={options[optionsKey]} type={type} setValue={newValue => setOptions({...options, [optionsKey]:parseFloat(newValue)})} />
            ))
        }
        {
            Object.entries(options.simulations)?.map(((simulationEntry, index) => <SimulationCard options={simulationEntry[1]} key={simulationEntry[0]}
                setOptions={newOptions => setOptions({...options, simulations: {...options.simulations, [simulationEntry[0]]:newOptions}})}/>))
        }
        <button onClick={addSimulation} >add simulation</button>
    </div>
}

export default SidePanel;