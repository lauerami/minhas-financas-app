import React from "react";

export default (props) => {
    
    const option = props.lista.map( (option, index) => {
        return(
            <option key={index} value={option.value}>{option.label}</option>
        )
    })
    
    return (
        <select {...props} >
            {option}
        </select>
    )
}