import React, { Component } from 'react'
import "./Components/style.css";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Rcards from './rcards.js'


export class Home extends Component {

    render() {
        document.title="Home-Chef's Library";
        return (
            <div>
                <div className="searchpanel">
                <Form inline>
                <FormControl type="text" placeholder="Search recipes" className="mr-sm-2 search" onChange={this.onchange}/>
                <Button variant="outline-primary"><FontAwesomeIcon icon={ faSearch } /></Button>
                </Form>
                </div>
                <div className="recipeshowcase">
                    <Rcards/>
                </div>
            </div>
        )
    }
}

export default Home
