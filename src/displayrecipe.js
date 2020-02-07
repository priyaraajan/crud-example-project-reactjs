import React, { Component } from 'react'
import firebase from './config/fire';
import {Container} from 'react-bootstrap'
import './App.css'
import {Animated} from "react-animated-css";

export default class displayrecipe extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: { },
            key: ''
        }
    }

    componentDidMount(){
        const ref = firebase.firestore().collection('recipes').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
              user: doc.data(),
              key: doc.id,
              isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        });
    }
    
    render() {
      document.title = "Recipe - Chef's Library";
        return (
            <div>
              <Animated animationIn="slideInLeft" animationInDuration={1000} isVisible={true}>
              <Container>
                <div className="recdata"> 
                
                  <h2>{this.state.user.name}</h2>
                <h3>
                  Ingredients:
                </h3>
                 <ul>
                   <li>{this.state.user.ingredients}</li>
                 </ul>
                 <h3>
                  Procedure:
                </h3>
                <p>
                   {this.state.user.procedure}
                </p>
                </div>
                </Container>
                </Animated>
            </div>
        )
    }
}
