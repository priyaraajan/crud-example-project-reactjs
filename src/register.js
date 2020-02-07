import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import fire from './config/fire';
import {Animated} from "react-animated-css";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
  


export default class register extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    
        this.state = {
          Name: null,
          email: null,
          password: null,
          confirmpassword:null,
          formErrors: {
            Name: "",
            email: "",
            password: "",
            confirmpassword:""
          }
          
        };
      }
    
      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {
          console.log(`
            --SUBMITTING--
             Name: ${this.state.Name}
            Email: ${this.state.email}
            Password: ${this.state.password}
          `);
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
          case "Name":
            formErrors.Name =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          case "confirmpassword":
            formErrors.cpassword =
             this.state.password !== this.state.confirmpassword ? "passwords don't match" : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };

      signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).then((u)=>{console.log(u)
        alert("sign up successful!!!")})
        .catch((error) => {
            console.log(error) 
            alert("Some error occured during sign up process.");
          })
      }
    

    render() {
        const { formErrors } = this.state;
        document.title="Register-Chef's Library";
        return (
            <div>
                <Container>
                <Animated animationIn="fadeInDown"animationInDuration={1000} isVisible={true}>
                <div className="regbox">
                  <h5>User Registeration</h5>
                <Form onSubmit={this.handleSubmit} noValidate>
                    
                        <Form.Label htmlFor="Name">Name</Form.Label>
                        <Form.Control type="text" name="Name" placeholder="Enter Name" className={formErrors.Name.length > 0 ? "error" : null} noValidate
                onChange={this.handleChange}/>
                {formErrors.Name.length > 0 && (
                <span className="errorMessage">{formErrors.Name}</span>
              )}
                   
                        <Form.Label htmlFor="email">Email ID</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter Email" className={formErrors.email.length > 0 ? "error" : null} noValidate
                onChange={this.handleChange}/>
                {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}

                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter password" className={formErrors.password.length > 0 ? "error" : null} noValidate
                onChange={this.handleChange}/>
                {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}

                        <Form.Label htmlFor="confirmpassword">Re enter password</Form.Label>
                        <Form.Control type="password" name="confirmpassword" placeholder="" className={formErrors.password.length > 0 ? "error" : null} noValidate 
                        onChange={this.handleChange} />
                        {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.cpassword}</span>
              )}
                </Form>

                <div className="btncmb">
                <div style={{padding:"20px"}}>
                <Button variant="success" type="submit" onClick={this.signup} >
                    Signup
                </Button>
                </div>
                <div style={{padding:"20px"}}>
                <Button variant="danger" type="" >
                    clear all
                </Button>
                </div>
                </div>
                </div>
                </Animated>
                </Container>
            </div>
        )
    }
}
