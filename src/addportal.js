import React, { useState, Fragment, useEffect } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'
import firebase from './config/fire';
import './App.css'
import Account from './account.js';

const Addportal = () => {

	// Data
	const usersData = [
		{ id: '1', name: 'Maggie noodles', type: 'snack', ingredients: 'maggie,tastemaker,water', important:'water level', procedure:'' },
		{ id: '2', name: 'tea', type: 'drink', ingredients: 'milk,teapowder,water', important:'watch at tea boilig point', procedure:'' },
		{ id: '3', name: 'omelette', type: 'breakfast', ingredients: 'egg,salt,pepper', important:'sunny side up', procedure:'' },
	]

	const initialFormState = { id: '', name: '', type: '', ingredients: '', important:'', procedure:'' }

	// Setting state
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
		  const db = firebase.firestore();
		  const data = await db.collection("recipes").get();
		  setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		};
		fetchData();
	  }, []);

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])

		const db = firebase.firestore();
        db.collection("recipes").add({ id: user.id, name: user.name, type:user.type, ingredients: user.ingredients, important: user.important, procedure: user.procedure  });
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))

		const db = firebase.firestore()
		db.collection('recipes').doc(id).delete();


	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))

		const db = firebase.firestore()
        db.collection('recipes').doc(updatedUser.id).set({...updatedUser, name: updatedUser.name, type: updatedUser.type, ingredients: updatedUser.ingredients, important: updatedUser.important, procedure: updatedUser.procedure })


	}

	const editRow = user => {
		setEditing(true)
		setCurrentUser({ id: user.id, name: user.name, type:user.type, ingredients: user.ingredients, important: user.important, procedure: user.procedure })
	}

	document.title="Add Recipes-Chef's Library";
	return (
		<div className="container">

			<div className="portalbg">
			<h1>Recipe uploader portal</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit Recipe</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add Recipe</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View Recipes</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		
		
		</div>
		<div className="signout">
					<Account/>
		</div>
		</div>

	)
}

export default Addportal