import React from "react";
import './App.css';
import TestSelect from "./TestSelect";
import options from "./options.json"
import nestedOptions from "./nestedOptions.json"

function App() {
  return (
    <div>
        <label htmlFor="example">What city do you live in?</label>
        <TestSelect
            options={nestedOptions}
            placeholder="Choose a city"
            clearable
            isMulti
            isCheckbox
        />
    </div>
  );
}

export default App;



