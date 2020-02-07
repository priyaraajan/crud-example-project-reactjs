import React, { Component } from 'react'
import fire from './config/fire';
import auth from './auth'
import { withRouter } from 'react-router-dom';

class account extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
        auth.login(() => {
            this.props.history.push("/login");
          });
    }

    render() {
        return (
            <div>
                <button onClick={this.logout} id="lgbtn">Logout</button>
            </div>
        )
    }
}

export default withRouter(account)