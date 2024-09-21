/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import Input from "./Input";
import SimulationCard from "./SimulationCard";
import { Button, Stack } from "@mui/material";
import GenericInput from './GenericInput';
import { activateIfFunction } from '../utils';

const padding = css`
    padding: 1em;
`;

const SidePanel = ({options, setOptions, defaultSimulationOptions, overallOptions, simulationFields}) => {

    const simulationKeys = Object.keys(options.simulations);
    const newSimulationKey = simulationKeys.length === 0 ? 1 : Math.max(...simulationKeys) + 1;

    const addSimulation = () => {
        setOptions(options => ({...options, simulations: {...options.simulations, [newSimulationKey]: defaultSimulationOptions(newSimulationKey)}}));
    }

    const removeSimulation = (removedKey) => {
        setOptions(options => ({...options, simulations: Object.entries(options.simulations).filter(entry => entry[0] !== removedKey).reduce((prev,curr)=> ({...prev, [curr[0]]:curr[1]}),{})}));
    }

    const setSimulationOptions = simulationEntry => newOptions => {
        setOptions(oldOpttions => {
            const simulationKey = simulationEntry[0];
            const newOptionsValue = activateIfFunction(newOptions, oldOpttions.simulations[simulationKey]);
            
            return ({...oldOpttions, simulations: {...oldOpttions.simulations, [simulationKey]: newOptionsValue}})
        })
    }

    return <div css={padding}>
        <Stack spacing={3}>
            {
                overallOptions.map(fieldSettings => <GenericInput {...fieldSettings} options={options} setOptions={setOptions} key={fieldSettings.title}/>)
            }
            {
                Object.entries(options.simulations)?.map(((simulationEntry, index) => (
                    <SimulationCard options={simulationEntry[1]} 
                        key={simulationEntry[0]}
                        setOptions={setSimulationOptions(simulationEntry)}
                        onRemove={() => removeSimulation(simulationEntry[0])}
                        fields={simulationFields}
                    />)))
            }
            <Button onClick={addSimulation} variant='outlined'>add simulation</Button>
        </Stack>
    </div>
}

export default SidePanel;