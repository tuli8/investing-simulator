/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import Input from "./Input";
import SimulationCard from "./SimulationCard";
import { Button, Stack } from "@mui/material";

const overallOptions = [
    {
        title: 'months simulated',
        optionsKey: 'months',
        type: 'number',
    },
];

const padding = css`
    padding: 1em;
`;

const SidePanel = ({options, setOptions, defaultSimulationOptions, simulationFields}) => {

    const simulationKeys = Object.keys(options.simulations);
    const newSimulationKey = simulationKeys.length === 0 ? 1 : Math.max(...simulationKeys) + 1;

    const addSimulation = () => {
        setOptions({...options, simulations: {...options.simulations, [newSimulationKey]: defaultSimulationOptions(newSimulationKey)}});
    }

    const removeSimulation = (removedKey) => {
        setOptions({...options, simulations: Object.entries(options.simulations).filter(entry => entry[0] !== removedKey).reduce((prev,curr)=> ({...prev, [curr[0]]:curr[1]}),{})});
    }

    return <div css={padding}>
        <Stack spacing={3}>
            {
                overallOptions.map(({title, optionsKey, type}) => (
                    <Input title={title} value={options[optionsKey]} type={type} setValue={newValue => setOptions({...options, [optionsKey]:parseFloat(newValue)})} 
                        key={title}/>
                ))
            }
            {
                Object.entries(options.simulations)?.map(((simulationEntry, index) => <SimulationCard options={simulationEntry[1]} key={simulationEntry[0]}
                        setOptions={newOptions => setOptions({...options, simulations: {...options.simulations, [simulationEntry[0]]: newOptions}})}
                        onRemove={() => removeSimulation(simulationEntry[0])}
                        fields={simulationFields}
                    />))
            }
            <Button onClick={addSimulation} variant='outlined'>add simulation</Button>
        </Stack>
    </div>
}

export default SidePanel;