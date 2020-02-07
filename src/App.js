import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Addrecipe from './addportal.js';
import './App.css';
import Navbar from './Components/navbar.js';
import Home from './Home.js';
import Loginre from './loginredirect.js';
import Signup from './register.js';
import Displayrecipe from './displayrecipe.js';
import { ProtectedRoute } from "./protected.route";
import firebase from './config/fire';
import Footer from './Components/footer'


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('recipes');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, ingredients } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        ingredients,
      });
    });
    this.setState({
      users
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
    

  render(){
  return (

    <div className="App">
      <Router>
         <Navbar/>
      <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Loginre} />
              <ProtectedRoute exact path='/addrecipe' component={Addrecipe}/>
              {/* <Route exact path='/addrecipe' component={Addrecipe} /> */}
              <Route exact path='/signup' component={Signup} />
              <Route exact path={`/recipe/:id`} component={Displayrecipe} render={(props) => <Displayrecipe {...props}/>} />
       </Switch>
       <Footer/>
      </Router>
    </div>
  );
}
}

export default App;