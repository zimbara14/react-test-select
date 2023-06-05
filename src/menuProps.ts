import {SelectProps} from "@mui/material";

export const MenuProps: SelectProps['MenuProps'] = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    marginThreshold: 0,
};