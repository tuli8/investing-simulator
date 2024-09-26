import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";


const Input = ({value, setValue, type, title}) => {
    const [editableValue, setEditableValue] = useState(value);
    const inputRef = useRef();
    
    const keyUpHundler = e => {
        if (e.code !== 'Enter') {
            return;
        }

        setValue(e.target.value);
    }
    
    const focusOutHundler = e => {
        setValue(e.target.value);
    }

    useEffect(() => {
        inputRef.current.addEventListener('keyup', keyUpHundler);
        inputRef.current.addEventListener('focusout', focusOutHundler);
    }, []);

    useEffect(() => {
        setEditableValue(value);
    }, [value])

    return <div>
        <TextField value={editableValue} onChange={e => setEditableValue(e.target.value)} type={type} label={title} ref={inputRef}/>
    </div>
}

export default Input;