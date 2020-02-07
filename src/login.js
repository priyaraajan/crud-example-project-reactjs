import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import "./Components/style.css";
import { Link, withRouter } from 'react-router-dom';
import fire from './config/fire';
import auth from './auth'
import {Animated} from "react-animated-css";


export class login extends Component {
 

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      auth.login(() => {
        this.props.history.push("/addrecipe");
      });
    }).catch((error) => {
        console.log(error);
        alert("no such account found.Please check your email ID or password")
      });

      

  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }
    

    render() {
      document.title="Login-Chef's Library";
        return (
            <div>
                <Container>
                 <Animated animationIn="fadeInDown" animationInDuration={1000} isVisible={true}>
                <div className="logbox">
                <Form>
                    <Form.Label style={{padding:"10px"}}>Username</Form.Label>
                    <Form.Control placeholder="Enter email" value={this.state.email} onChange={this.handleChange} type="email" name="email"/>

                    <Form.Label style={{padding:"10px"}}>Password</Form.Label>
                    <Form.Control value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  />
                
                <div style={{padding:"20px"}}>
                <Button variant="primary" type="submit" onClick={this.login} >
                    login 
                </Button>
                </div>
                </Form>
                <small>if not a member please <Link to="/signup">signup</Link></small>
                </div>
                </Animated>
                </Container>
            </div>
        )
    }
}

export default withRouter(login)
