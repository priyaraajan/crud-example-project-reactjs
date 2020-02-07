import React from 'react'
import './style.css'
import Container from 'react-bootstrap/Container'

export default function footer() {
    return (
        <div>
            <div className="footer">
                <Container>
                <hr/>
            <p style={{color:'black'}}>&copy; Designed and developed by Priyarajan.</p>
            </Container>
            </div>
        </div>
    )
}
