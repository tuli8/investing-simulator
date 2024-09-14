import { Checkbox, FormControlLabel } from "@mui/material"

const BooleanField = ({title, value, setValue}) => {
    return <FormControlLabel control={<Checkbox checked={value} onChange={e => setValue(e.target.checked)} />} label={title} />
}

export default BooleanField;