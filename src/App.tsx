import React, {useState} from "react";
import './App.css';
import TestSelect from "./TestSelect";
import options from "./options.json"
import nestedOptions from "./nestedOptions.json"
import AsyncTestSelect from "./AsyncTestSelect";
import {optionProp} from "../customTypes/testSelectProps";
import {Box, FormControlLabel, FormGroup, Switch} from "@mui/material";

function App() {

    const [val, setVal] = useState({
        clearable: false,
        grouped: false,
        multi: false,
        checkbox: false
    })

    const filterOptions = (inputValue: string) =>
        options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()),
        );

    const promiseOptions = (inputValue: string) =>
        new Promise<optionProp[]>((resolve) => {
            setTimeout(() => {
                resolve(filterOptions(inputValue));
            }, 1000);
        });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.checked
        setVal(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

  return (
    <Box
        sx={{
            margin: '50px 0',
            gap: '25px',
            display: 'flex',
            flexDirection: 'column',
            border: 'black',
            alignItems: 'center',
            width: '100%'
        }}
    >
        <h1>What city do you live in?</h1>
        <h3>TestSelect</h3>
        <TestSelect
            options={val.grouped ? nestedOptions : options}
            placeholder="Choose a city"
            clearable={val.clearable}
            isMulti={val.multi}
            isCheckbox={val.checkbox}
        />
        <FormGroup>
            <FormControlLabel control={<Switch checked={val.clearable} name="clearable" onChange={handleChange} />} label="Clearable" />
            <FormControlLabel control={<Switch checked={val.grouped} name="grouped" onChange={handleChange} />} label="Grouped options" />
            <FormControlLabel control={<Switch checked={val.multi} name="multi" onChange={handleChange} />} label="isMulti" />
            <FormControlLabel control={<Switch checked={val.checkbox} disabled={!val.multi} name="checkbox" onChange={handleChange} />} label="isCheckbox" />
        </FormGroup>
        <h3>AsyncTestSelect</h3>
        <AsyncTestSelect
            options={options}
            loadOptions={promiseOptions}
        />
    </Box>
  );
}

export default App;



