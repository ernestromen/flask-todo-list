import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/v1.0/test")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <body>
          <div class="header">
            <h1>Header</h1>
            <p>My supercool header</p>
          </div>
          <div class="sidebar">
            <a class="active" href="#home">
              Home
            </a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
          <button className="btn btn-success">testing bootstrap</button>
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                {item.name} {item.price}
              </li>
            ))}
          </ul>
        </body>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
