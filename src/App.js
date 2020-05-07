import React, { Component } from "react";
import "./App.css";
import ButtonComponent from "./components/ButtonComponent/ButtonComponent";
import TextComponent from "./components/TextComponet/TextComponent";
import PubSub from "pubsub-js";

class App extends Component {
  state = {
    colorText: "black",
    backgroundColor: "white",
  };

  componentDidMount() {
    PubSub.subscribe("colorChange", (msg, data) => {
      if (data.isText === "color") {
        this.setState({
          colorText: data.color.hex,
        });
      } else {
        this.setState({
          backgroundColor: data.color.hex,
        });
      }
    });

    PubSub.subscribe("colorButton", (msg, data) => {
      if (data.isText === "color") {
        this.setState({
          colorText: data.color,
        });
        console.log(data);
      } else {
        this.setState({
          backgroundColor: data.background,
        });
        // console.log(this.state.backgroundColor);
      }
    });
  }

  render() {
    const backgroundColorProp = "backgroundColor";
    const backgroundColorTitle = "Background Color";
    const colorProp = "color";
    const colorTitle = "Text Color";
    const infoKeyboardShortcutBackground = true;
    const infoKeyboardShortcutTextColor = true;

    return (
      <>
        <div
          className="displayText"
          style={{
            backgroundColor: this.state.backgroundColor,
            color: this.state.colorText,
          }}
        >
          <TextComponent color={this.state.colorText}></TextComponent>
        </div>
        <div className="divButtonBackgroundColor">
          <ButtonComponent
            color={backgroundColorProp}
            title={backgroundColorTitle}
            infoKeyboardShortcutBackground={infoKeyboardShortcutBackground}
          />
        </div>
        <div className="divButtonColor">
          <ButtonComponent
            color={colorProp}
            title={colorTitle}
            infoKeyboardShortcutTextColor={infoKeyboardShortcutTextColor}
          />
        </div>
      </>
    );
  }
}

export default App;
