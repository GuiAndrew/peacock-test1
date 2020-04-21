import React, { Component } from "react";
import { ChromePicker } from "react-color";
import PubSub from "pubsub-js";
import "./ColorPicker.css";

class ColorPicker extends Component {
  state = {
    background: "",
  };

  save = () => {
    this.setState({ visibile: false });
  };

  handleChangeComplete = (color) => {
    PubSub.publish("colorChange", { color: color, isText: this.props.isText });
    // console.log(color)
    this.setState({ background: color.rgb });
  };

  render() {
    return (
      <div className="divPicker">
        {this.props.visibile && (
          <ChromePicker
            color={this.state.background}
            onChangeComplete={this.handleChangeComplete}
            isText={this.props.isText}
          />
        )}
      </div>
    );
  }
}

export default ColorPicker;
