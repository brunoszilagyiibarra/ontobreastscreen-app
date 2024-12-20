import React, {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import '../../spa/pages/PagesCommonStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useTranslation} from "react-i18next"; // Ensure Bootstrap CSS is imported

export default function CustomBoostrapDropdown({customActionOnSelection, field, defaultValue}) {

    const {t} = useTranslation();
    const itemMappings = new Map(field.options.map(op => [op.uri, op.label]));
    const [isFocused, setIsFocused] = useState(false);

    const handleSelect = (eventKey) => {
        customActionOnSelection(field.uri, eventKey);
    };

    const handleFocus = () => {
        setIsFocused(true); // Marca el Dropdown como enfocado cuando recibe foco
    };

    const handleBlur = () => {
        setIsFocused(false); // Marca el Dropdown como desenfocado cuando pierde foco
    };


    let editable = field.editable == null ? true : field.editable
    let defValue = defaultValue === '' ? t('dropdown_custom_empty_op') : itemMappings.get(defaultValue)

    return (
        <div id={"dropdown-comp-" + field.uri + "-div"}>
            <label htmlFor={field.uri}>{field.label}</label>
            <Dropdown onSelect={handleSelect}  id={field.uri}>
                <Dropdown.Toggle variant="success" id={field.uri + "-btn"}
                                 onFocus={handleFocus}      // Establece el estado de foco
                                 onBlur={handleBlur}        // Establece el estado de desenfoque
                                 className={`${isFocused ? "focused" : ""}`}  // Añade clases según el estado
                                 disabled={!editable}
                >
                    {defValue}
                </Dropdown.Toggle>

                <Dropdown.Menu id={field.uri + "-menu"}>
                    { field.options.map ((op) => (
                        <Dropdown.Item key={op.uri} eventKey={op.uri}> {op.label}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

        </div>
    );
}