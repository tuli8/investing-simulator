import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

const OneTimeAlert = ({children}) => {
    const [shown, setShown] = useState(true);

    const close = () => {
        setShown(false);
    }

    return (
        <Dialog
          open={shown}
        >
            <DialogTitle>{children}</DialogTitle>
            <DialogActions>
                <Button onClick={close}>I understand</Button>
            </DialogActions>
        </Dialog>
    );
}

export default OneTimeAlert;