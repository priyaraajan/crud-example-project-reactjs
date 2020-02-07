import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import {Container} from 'react-bootstrap'
import firebase from './config/fire';
import {Link} from 'react-router-dom'


function Rcards() {

const [users,setUsers]=React.useState([])

    useEffect(() => {
		const fetchData = async () => {
		  const db = firebase.firestore();
		  const data = await db.collection("recipes").get();
		  setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		};
		fetchData();
      }, []);
      
        return (
            <div>
                <Container>
                    <div style={{'border-bottom':'1px solid black'}}>
                        <h2>Newly added recipes</h2>
                    </div>

                    <div className="cardcont">
                  
                    {users.map((user,id)=>(
                        <Card style={{ display:'inline-block'}} key="id">
                        <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user.type}</Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Card.Link key={id} ><Link to={`/recipe/${id}`}>View recipe</Link></Card.Link>
                        </Card.Body>
                        </Card>
                    ))}
                </div>
                    </Container>
            </div>
        )
    }

export default Rcards