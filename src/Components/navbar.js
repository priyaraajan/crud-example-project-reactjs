import React, { Component } from 'react'
import  { Nav, Navbar, Container }  from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./style.css";


export class navbar extends Component {
    render() {
        return (
            <div>
              <Container>
                <Navbar collapseOnSelect expand="lg" >
  <Navbar.Brand className="nav"><Link to="/" style={{color:"black"}}>Chef's library</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link ><Link to="/login" style={{color:"black"}}>login</Link></Nav.Link>
      <Nav.Link ><Link to="/signup" style={{color:"black"}}>signup</Link></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
</Container>
            </div>
        )
    }
}

export default navbar
