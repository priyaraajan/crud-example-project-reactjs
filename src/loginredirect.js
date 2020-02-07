import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';
import Login from './login';
import Addrecipe from './addportal'
import {Route} from 'react-router-dom'

class Loginredirect extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div className="loginredirect">
        {this.state.user ? (<Route to="./addrecipe"><Addrecipe/></Route>) : (<Login />)}
      </div>
    );
  }
}

export default Loginredirect;