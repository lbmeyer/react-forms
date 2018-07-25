import React from "react";

const FormFields = props => {
  const renderFields = () => {
    const formArray = [];

    for (let elementName in props.formData) {
      formArray.push({
        id: elementName,
        settings: props.formData[elementName]
      });
    }

    return formArray.map((item, i) => {
      return (
        <div key={i} className="form_element">
          {renderTemplates(item)}
        </div>
      );
    });
  };

  const showLabel = (show, label) => {
    return show ? <label>{label}</label> : null;
  };

  const changeHandler = (e, id, blur) => {
    const newState = { ...props.formData };
    newState[id].value = e.target.value;

    // only validate data when we remove focus from element
    if (blur) {
      let validData = validate(newState[id]);
      // validData -> [bool, string]
      newState[id].valid = validData[0];
      newState[id].validationMessage = validData[1];
    }
    // set touched property to true once we blur out
    newState[id].touched = blur;

    props.change(newState);
  };

  const validate = element => {
    console.log(element);
    let error = [true, ""];

    if (element.validation.minLength) {
      const valid = element.value.length >= element.validation.minLength;
      const message = `${
        !valid
          ? "Must be greater than " + element.validation.minLength + " letters"
          : ""
      }`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const message = `${!valid ? "This field is required" : ""}`;

      // if not valid, we provide new array with valid=false + msg
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  const showValidation = data => {
    let errorMessage = null;

    if (data.validation && !data.valid) {
      errorMessage = (
        <div className="label_error">{data.validationMessage}</div>
      );
    }
    return errorMessage;
  };

  const renderTemplates = data => {
    let formTemplate = "";
    let values = data.settings;

    switch (values.element) {
      case "input":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <input
              {...values.config}
              value={values.value}
              onBlur={e => changeHandler(e, data.id, true)}
              onChange={e => changeHandler(e, data.id, false)}
            />
            {showValidation(values)}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <textarea
              {...values.config}
              value={values.value}
              onBlur={e => changeHandler(e, data.id, true)}
              onChange={e => changeHandler(e, data.id, false)}
            />
            {showValidation(values)}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <select
              value={values.value}
              name={values.config.name}
              onChange={e => changeHandler(e, data.id)}
            >
              {values.config.options.map((item, i) => (
                <option key={i} value={item.val}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderFields()}</div>;
};

export default FormFields;
