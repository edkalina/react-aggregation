import React from "react";
import { Select, Option } from "./Select";

const Two = () => <Option value="two">Two</Option>;
const Four = () => <Option value="four">Four</Option>;

const Nested = () => (
  <React.Fragment>
    <Option value="three">Three</Option>
    <Four />
    <Option value="five">Five</Option>
  </React.Fragment>
);

const DynamicOuter = ({ last }) => (
  <React.Fragment>
    <Option value="six">Six</Option>
    {last && <Option value="do">Dynamic Outer</Option>}
  </React.Fragment>
);

class DynamicContent extends React.Component {
  state = {
    flag: true
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({ flag }) => ({
        flag: !flag
      }));
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { flag } = this.state;

    return <Option value="dc">Dynamic {flag ? "CONTENT" : "content"}</Option>;
  }
}

class DynamicInner extends React.Component {
  state = {
    flag: true
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({ flag }) => ({
        flag: !flag
      }));
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { flag } = this.state;

    return (
      <React.Fragment>
        <Option value="7">Seven</Option>
        {flag && <Option value="di">Dynamic Inner</Option>}
      </React.Fragment>
    );
  }
}

class App extends React.Component {
  state = { last: true };

  toggleLast = () => {
    this.setState(state => ({ last: !state.last }));
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: "10px" }}>
          <button onClick={this.toggleLast}>
            Toggle last: {this.state.last ? "ON" : "OFF"}
          </button>
        </div>
        <Select initialValue="one">
          <Option value="one">
            <b>One</b>
          </Option>
          <Two />
          <Nested />
          <DynamicOuter last={this.state.last} />
          <DynamicContent />
          <DynamicInner />
        </Select>
      </div>
    );
  }
}

export default App;
