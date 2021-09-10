import React from 'react';
import Routes from "./routes";
import { UserContext } from "./contexts/UserContext";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlBase: props.urlBase
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.setState({urlBase: ""});
  }

  componentDidMount() {
    //
  }

  render() {
    const value = this.state;
    return (
      <UserContext.Provider value={value}>
        <Routes/>
      </UserContext.Provider>
    );
  }
}
export default App;