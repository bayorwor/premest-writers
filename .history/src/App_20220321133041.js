import ProfileCard from "./components/ProfileCard";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();

    // this makes it possible to use `handleClick` as a class method (function)
    this.handleClick = this.handleClick.bind(this);

    // how to set state in a class component
    this.state = {
      writers: {
        loading: false,
        list: [],
      },
    };
  }

  handleClick = () => {
    this.setState({
      writers: {
        loading: true,
      },
    });
    setTimeout(async () => {
      // fetch is a JavaScript API for getting information over the internet
      let resp = await fetch("/writers.json");
      let result = await resp.json();

      this.setState({
        writers: {
          loading: false,
          list: result,
        },
      });
    }, 3500);
  };

  render() {
    const {
      writers: { loading, list },
    } = this.state;

    if (loading) {
      return (
        <div>
          <h1> Writer Profiles </h1>
          <div className="container">
            <div className="card action">
              <p className="infoText"> Loading... </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1> Writer Profiles </h1>
        <div className="container">
          {list.length === 0 ? (
            <div className="card action">
              <p className="infoText"> Oops... no writer profile found</p>
              <button className="actionBtn" onClick={this.handleClick}>
                Get Writers
              </button>
            </div>
          ) : (
            list.map((writer) => (
              <ProfileCard key={writer.id} writer={writer} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
