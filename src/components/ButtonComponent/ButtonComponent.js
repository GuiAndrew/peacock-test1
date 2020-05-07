import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./ButtonComponent.css";
import PubSub from "pubsub-js";

class ButtonComponent extends Component {
  constructor() {
    super();

    this.state = {
      show: "hidden",
      visibile: false,
      infoKeyboardShortcutBackground: false,
      infoKeyboardShortcutTextColor: false,
      color: "",
      background: "",
      isText: "",
    };

    this.showColorPicker = this.showColorPicker.bind(this);
    this.handleOutsidePickerClose = this.handleOutsidePickerClose.bind(this);
    this.keyboardShortcutsFunc = this.keyboardShortcutsFunc.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyboardShortcutsFunc, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyboardShortcutsFunc, false);
  }

  showColorPicker = () => {
    if (!this.state.visibile) {
      this.setState({
        show: "visible",
        visibile: true,
        infoKeyboardShortcutBackground: this.props
          .infoKeyboardShortcutBackground,
      });

      window.addEventListener("click", this.handleOutsidePickerClose, false); // Window is like the document in react
    } else {
      this.setState({
        show: "hidden",
        visibile: false,
        infoKeyboardShortcutTextColor: this.props.infoKeyboardShortcutTextColor,
      });

      window.removeEventListener("click", this.handleOutsidePickerClose, false); // Window is like the document in react
    }
  };

  handleOutsidePickerClose = (event) => {
    // This is to ignore the click on the component picker.
    if (this.node.contains(event.target)) {
      return;
    }
    this.showColorPicker();
  };

  keyboardShortcutsFunc = (event) => {
    //////// Background
    // The color picker for the background color will appear
    // This will be shift + z
    if (event.shiftKey && event.keyCode === 90) {
      // console.log(event.keyCode);
      this.setState({
        infoKeyboardShortcutBackground: this.props
          .infoKeyboardShortcutBackground,
      });
      if (this.state.infoKeyboardShortcutBackground) {
        this.showColorPicker();
      }
    }

    // shift + q = blue
    if (event.shiftKey && event.keyCode === 81) {
      this.setState({
        color: "blue",
        isText: "background",
      });

      this.handleChangeColor();
    }
    // shift + w = white
    if (event.shiftKey && event.keyCode === 87) {
      this.setState({
        color: "white",
        isText: "background",
      });

      this.handleChangeColor();
    }
    // shift + e = black
    if (event.shiftKey && event.keyCode === 69) {
      this.setState({
        color: "black",
        isText: "background",
      });

      this.handleChangeColor();
    }
    // shift + r = red
    if (event.shiftKey && event.keyCode === 82) {
      this.setState({
        color: "red",
        isText: "background",
      });

      this.handleChangeColor();
    }
    // shift + t = yellow
    if (event.shiftKey && event.keyCode === 84) {
      this.setState({
        color: "yellow",
        isText: "background",
      });

      this.handleChangeColor();
    }
    // shift + y = green
    if (event.shiftKey && event.keyCode === 89) {
      this.setState({
        color: "green",
        isText: "background",
      });

      this.handleChangeColor();
    }

    //////// Text
    // The color picker for the text color will appear
    // This will be shift + x
    if (event.shiftKey && event.keyCode === 88) {
      // console.log(event.keyCode);
      this.setState({
        infoKeyboardShortcutTextColor: this.props.infoKeyboardShortcutTextColor,
      });
      if (this.state.infoKeyboardShortcutTextColor) {
        this.showColorPicker();
      }
    }

    // shift + a = blue
    if (event.shiftKey && event.keyCode === 65) {
      this.setState({
        color: "blue",
        isText: "color",
      });

      this.handleChangeColor();
    }
    // shift + s = white
    if (event.shiftKey && event.keyCode === 83) {
      this.setState({
        color: "white",
        isText: "color",
      });

      this.handleChangeColor();
    }
    // shift + d = black
    if (event.shiftKey && event.keyCode === 68) {
      this.setState({
        color: "black",
        isText: "color",
      });

      this.handleChangeColor();
    }
    // shift + f = red
    if (event.shiftKey && event.keyCode === 70) {
      this.setState({
        color: "red",
        isText: "color",
      });

      this.handleChangeColor();
    }
    // shift + g = yellow
    if (event.shiftKey && event.keyCode === 71) {
      this.setState({
        color: "yellow",
        isText: "color",
      });

      this.handleChangeColor();
    }
    // shift + h = green
    if (event.shiftKey && event.keyCode === 72) {
      this.setState({
        color: "green",
        isText: "color",
      });

      this.handleChangeColor();
    }
  };

  handleChangeColor = () => {
    if (this.state.isText === "color") {
      PubSub.publish("colorButton", {
        color: this.state.color,
        isText: this.state.isText,
      });
    } else {
      PubSub.publish("colorButton", {
        background: this.state.color,
        isText: this.state.isText,
      });
    }
  };

  render() {
    return (
      <div
        // This will provide access to DOM nodes.
        ref={(node) => {
          this.node = node;
        }}
      >
        <Button className="m-2" onClick={this.showColorPicker}>
          {this.props.title}
        </Button>
        <div
          style={{
            visibility: this.state.show,
          }}
        >
          <ColorPicker
            visibile={this.state.visibile}
            isText={this.props.color}
          />
        </div>
      </div>
    );
  }
}

export default ButtonComponent;
