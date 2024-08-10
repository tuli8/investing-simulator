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

const SidePanel = ({options, setOptions}) => {

    const lastSimulationKey = Math.max(...Object.keys(options.simulations));

    const addSimulation = () => {
        setOptions({...options, simulations: {...options.simulations, [lastSimulationKey+1]:{initial:1000, exponent:1}}})
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
                    setOptions={newOptions => setOptions({...options, simulations: {...options.simulations, [simulationEntry[0]]: newOptions}})}/>))
            }
            <Button onClick={addSimulation} variant='outlined'>add simulation</Button>
        </Stack>
    </div>
}

export default SidePanel;