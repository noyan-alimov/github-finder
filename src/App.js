import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import axios from 'axios';
import Search from './components/Search';
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  render() {
    return (
      <div className="App">
        <Navbar />
        <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length>0 ? true : false} />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
