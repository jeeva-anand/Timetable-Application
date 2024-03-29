import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";

class InputBox extends React.Component {
  constructor() {
    super();
    this.createData = this.createData.bind(this);
  }

  createData(event) {
    event.preventDefault();
    const data = {
      name: this.name.value,
    };
    if (this.props.data === "teachers") {
      this.props.addTeacher(data);
    } else {
      this.props.addRoom(data);
    }
    this.inputForm.reset();
  }

  render() {
    let placeholderValue;
    if (this.props.data === "subjects") {
      placeholderValue = "Enter Room number";
    } else {
      placeholderValue = "Enter Teacher's name";
    }

    return (
      <form
        ref={(input) => (this.inputForm = input)}
        onSubmit={this.createData}
      >
        <input
          style={{ width: "60%", height: "2rem", marginLeft: 48, borderRadius: 8, borderWidth: "1px"}}
          ref={(input) => (this.name = input)}
          type="text"
          label={placeholderValue}
        />
        <Button style={{ marginLeft: 16 }} raised type="submit" color="accent">
          Add
        </Button>
      </form>
    );
  }
}

InputBox.propTypes = {
  addTeacher: PropTypes.func.isRequired,
  addRoom: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
};

export default InputBox;
