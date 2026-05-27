import React from "react"
const TextInput = (props) => {
    return (
        <input
            className={`${props.className}`}
            placeholder={props.placeholder}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
            min={props.min}
            max={props.max}
            maxLength={props.maxLength}
            onChange={(event) => props.onChange(event, props.id)}
            onBlur={props.onBlur ? (e) => props.onBlur(props.id) : undefined}
            disabled={props.disabled === true}
            autoComplete={props.autoComplete ? props.autoComplete : "off"}
            onClick={(event) => props.handleOnClick ? props.handleOnClick(event, props.id) : null}
            checked={props.checked !== null ? props.checked : ""}
        />
    );
}
export default TextInput;