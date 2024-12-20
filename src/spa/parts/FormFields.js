import CustomBoostrapDropdown from "../wip/dropdown-custom";
import React from "react";

export default function FormFields({formFields, handleChange, valueHolder}) {

    if (formFields === null || !formFields) {
        return null
    }

    return formFields.map((field) => {

            if (field.type === "single-option" || field.type === "multi-option") {
                let multi = field.type === "multi-option";
                return <CustomBoostrapDropdown field={field} customActionOnSelection={handleChange} defaultValue={valueHolder(field.uri)}/>

            }

            let varType
            if (field.type === "integer" || field.type === "double") {
                varType = "number"
            } else if (field.type === "boolean") {
                varType = "checkbox"
            } else if (field.type === "string") {
                varType = "text"
            }

            let editable = field.editable == null ? true : field.editable

            return <div key={field.uri}>
                <label style={{display: "block", marginBottom:"5px", marginTop: "5px"}} htmlFor={field.uri}>{field.label}</label>
                <input style={{marginBottom:"5px"}} type={varType} id={field.uri} onChange={event => handleChange(event.target.id,
                    event.target.value)} value={valueHolder(field.uri)} disabled={!editable}/>
            </div>

        }
    );
}