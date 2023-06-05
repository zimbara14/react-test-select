import React, {useRef, useState} from 'react';
import {
    nestedOptionProps,
    optionProp,
    testSelectProps,
} from "../customTypes/testSelectProps";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    Box, Checkbox,
    Chip,
    FormControl,
    IconButton,
    ListItemText,
    ListSubheader,
    MenuItem,
    OutlinedInput,
    Stack
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";


// isMulti + isCheckbox + grouped + clearable + single
function TestSelect(props: testSelectProps) {
    const { options, placeholder, clearable = false, isMulti = false, isCheckbox = false } = props

    const [val, setVal] = useState('')
    const ref = useRef()
    const [selectedVal, setSelectedVal] = useState([])

    const handleChangeMulti = (e: any) => {
        setSelectedVal(e.target.value)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
    };

    const handleDelete = () => {
        setSelectedVal([])
        setVal('')
    }

    function isNested(object: any): object is nestedOptionProps {
        return 'options' in object
    }

    const renderSelectGroup = (option: optionProp | nestedOptionProps) => {
        if(isNested(option)) {
            const items = option.options.map((o: optionProp) => {
                return (
                    <MenuItem key={o.value} value={o.label}>
                        {isMulti && isCheckbox ?
                            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                <Checkbox checked={selectedVal.filter(e => e === o.label).length > 0} />
                                <ListItemText primary={o.label} />
                            </Box>
                        :
                            o.label
                        }
                    </MenuItem>
            )})
            return [<ListSubheader>{option.label}</ListSubheader>, items];
        } else {
            return <MenuItem value={option.label} key={option.value}>{option.label}</MenuItem>
        }
    }

    return (
        <Box sx={{ maxWidth: '500px', display: 'flex', justifyContent: 'center', color: 'red'}}>
            <FormControl fullWidth>
                {isMulti ?
                    <Select
                        ref={ref}
                        multiple={isMulti}
                        value={selectedVal}
                        onChange={(e) => handleChangeMulti(e)}
                        onClick={(e) => {
                            e.stopPropagation();
                            // e.preventDefault();
                        }}
                        renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                                {selected.map((option: any) => (
                                    <Chip
                                        key={option}
                                        label={option}
                                        onDelete={() =>
                                            setSelectedVal(selectedVal.filter(item => item !== option))
                                        }
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                        }
                                    />
                                ))}
                            </Stack>
                        )}
                        input={<OutlinedInput label="Multiple Select" />}
                        endAdornment={
                            clearable ?
                                <IconButton sx={{display: selectedVal.length === 0 ? "none": ""}} onClick={handleDelete}>
                                    <ClearIcon />
                                </IconButton>
                                : <></>
                        }
                    >
                        {options.map((option: optionProp | nestedOptionProps, key: any) => renderSelectGroup(option))}
                    </Select>
                    :
                    <Select
                        labelId="test-select-label"
                        defaultValue=""
                        value={val}
                        label={placeholder}
                        onChange={handleChange}
                        endAdornment={
                            clearable ?
                                <IconButton sx={{display: val.length === 0 ? "none": ""}} onClick={handleDelete}>
                                    <ClearIcon />
                                </IconButton>
                                : <></>
                        }
                    >
                        {options.map((option: optionProp | nestedOptionProps, key: any) => renderSelectGroup(option))}
                    </Select>
                }
            </FormControl>
        </Box>
    );
}

export default TestSelect;