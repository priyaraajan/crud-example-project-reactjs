import React, { Component } from 'react';
import firebase from '../config/fire'

class Picret extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: null,
        url: '',
      }
      this.handleChange = this
        .handleChange
        .bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleChange = e => {

      if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({image}));
      }
    }
    handleUpload = () => {
        const storage = firebase.storage();
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',    
      () => {
          // complete function ....
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
              console.log(url);
              this.setState({url});
          })
      });
    }
    render() {
      const style = {
 
      };
      return (
        <div style={style}>
  
        <br/>
          <input type="file" onChange={this.handleChange}/>
          <button onClick={this.handleUpload}>Upload</button>
          <br/>
          <img src={this.state.url} alt="Uploaded images" height="30" width="40"/>
        </div>
        
      )
    }
  }
  
  export default Picret;