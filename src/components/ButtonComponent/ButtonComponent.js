import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./ButtonComponent.css";

class ButtonComponent extends Component {
  constructor() {
    super();

    this.state = {
      show: "hidden",
      visibile: false,
      infoKeyboardShortcutBackground: false,
      infoKeyboardShortcutTextColor: false,
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
    // This will be ctrl + shift + h
    if (event.ctrlKey && event.shiftKey && event.keyCode === 72) {
      // console.log(event.keyCode);
      this.setState({
        infoKeyboardShortcutBackground: this.props
          .infoKeyboardShortcutBackground,
      });
      if (this.state.infoKeyboardShortcutBackground) {
        this.showColorPicker();
      }
    }

    // This will be ctrl + shift + k
    if (event.ctrlKey && event.shiftKey && event.keyCode === 75) {
      // console.log(event.keyCode);
      this.setState({
        infoKeyboardShortcutTextColor: this.props.infoKeyboardShortcutTextColor,
      });
      if (this.state.infoKeyboardShortcutTextColor) {
        this.showColorPicker();
      }
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
