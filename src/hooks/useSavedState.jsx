import { useEffect, useState } from "react";

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
        saveState(newState);
        setState(newState);
    }

    return [state, setSavedState];
}

export default useSavedState;