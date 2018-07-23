import React, { Component } from "react";
import FormFields from "../widgets/Forms/FormFields";

class User extends Component {
  state = {
    formData: {
      name: {
        element: "input",
        value: "",
        label: true,
        labelText: "Name",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your name"
        }
      },
      lastname: {
        element: "input",
        value: "",
        label: true,
        labelText: "Lastname",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your Lastname"
        }
      },
      message: {
        element: "textarea",
        value: "",
        label: true,
        labelText: "Message",
        config: {
          name: "message_input",
          rows: 4,
          cols: 36
        }
      },
      age: {
        element: "select",
        value: "",
        label: true,
        labelText: "Age",
        config: {
          name: "age_input",
          options: [
            { val: "1", text: "10-20" },
            { val: "2", text: "20-30" },
            { val: "3", text: "+30" }
          ]
        }
      }
    }
  };

  updateForm = newState => {
    this.setState({
      formData: newState
    });
  };

  submitForm = e => {
    //     console.log(this.state.formData);
    e.preventDefault();

    let dataToSubmit = {};

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    console.log(dataToSubmit);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitForm}>
          <FormFields formData={this.state.formData} change={this.updateForm} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default User;
