import { useEffect, useState } from "react";
import {activateIfFunction} from '../utils';

const useSavedState = (defaultState, hasState, loadState, saveState) => {
    const [state, setState] = useState(defaultState);

    useEffect(() => {
        if (hasState()) {
            setState(loadState());
        } else {
            saveState(state);
        }
    }, []);
    
    const setSavedState = (newState) => {
        setState(oldState => {
            const updatedState = activateIfFunction(newState, oldState);
            saveState(updatedState);
            return updatedState;
        });
    }

    return [state, setSavedState];
}

export default useSavedState;