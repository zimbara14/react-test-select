import React, {useState} from 'react';
import {asyncSelectProps, optionProp} from "../customTypes/testSelectProps";
import {Box, FormControl, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";
import {MenuProps} from "./menuProps";

function AsyncTestSelect(props: asyncSelectProps) {
    const { options, loadOptions } = props

    const [input, setInput] = useState('')

    const handleChange = async (e: any) => {
        setInput(e.target.value)
        return await loadOptions(input).then(r => r)
    }

    return (
        <Box sx={{ width: '500px' }}>
            <FormControl fullWidth>
            <Select
                MenuProps={MenuProps}
                value={input}
                onChange={(e) => handleChange(e)}
            >
                {options.map((option: optionProp, key: any) =>
                    <MenuItem value={option.label} key={option.value}>
                        {option.label}
                    </MenuItem>
                )}
            </Select>
            </FormControl>
        </Box>
    );
}

export default AsyncTestSelect;