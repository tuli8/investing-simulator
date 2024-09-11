import useSavedState from "./useSavedState";

const useLocalStorageState = (defaultValue, localStorageName) => {
    const saveData = (data) => localStorage.setItem(localStorageName, JSON.stringify(data));
    const loadData = () => JSON.parse(localStorage.getItem(localStorageName));
    const hasData = () => localStorage.getItem(localStorageName) !== null;

    return useSavedState(defaultValue, hasData, loadData, saveData);
}

export default useLocalStorageState;