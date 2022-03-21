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

  // this method (function) is responsible for fetching and updating the  `writers` data in state
  handleClick() {
    // temporarily sets the value of loading to `true`
    // we use setState to update values of state in  class components
    // later you'll learn how to do it in functional components
    this.setState({
      writers: {
        loading: true,
      },
    });

    // setTimeout is a built-in JavaScript function that waits for some seconds before calling a function
    // in this case, we are waiting for 3.5s
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
  }

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
