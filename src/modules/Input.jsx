import { TextField } from "@mui/material";

const Input = ({value, setValue, type, title}) => {
    return <div>
        <TextField value={value} onChange={e => setValue(e.target.value)} type={type} label={title} />
    </div>
}

export default Input;