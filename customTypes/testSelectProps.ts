export interface optionProp {
    label: string,
    value: string
}

export interface nestedOptionProps {
    label: string,
    options: optionProp[]
}

export type testSelectProps = {
    options: optionProp[] | nestedOptionProps[],
    placeholder: string,
    clearable?: boolean,
    isMulti?: boolean,
    isCheckbox?: boolean
}

export type testTwoSelectProps = {
    options: optionProp[],
    placeholder: string,
    clearable?: boolean,
    isMulti?: boolean
}