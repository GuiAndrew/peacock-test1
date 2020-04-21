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
  }

  render() {
    const backgroundColorProp = "backgroundColor";
    const backgroundColorTitle = "Background Color";
    const colorProp = "color";
    const colorTitle = "Color";

    return (
      <>
        <div
          className="displayText"
          style={{
            backgroundColor: this.state.backgroundColor,
            color: this.state.colorText,
          }}
        >
          <div
            style={{
              backgroundcolor: this.state.backgroundColor,
              color: this.state.colorText,
            }}
          >
            <TextComponent color={this.state.colorText}></TextComponent>
          </div>
        </div>
        <div className="divButtonBackgroundColor">
          <ButtonComponent
            color={backgroundColorProp}
            title={backgroundColorTitle}
          />
        </div>
        <div className="divButtonColor">
          <ButtonComponent color={colorProp} title={colorTitle} />
        </div>
      </>
    );
  }
}

export default App;
