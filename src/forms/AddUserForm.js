import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { id: null, name: '', type:'', ingredients: ',', important:'', procedure:'' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.name || !user.type || !user.ingredients || !user.important || !user.procedure) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>Dish name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>Type</label>
			<input type="text" name="type" value={user.type} onChange={handleInputChange} />
			<label>Ingredients</label>
			<input type="text" name="ingredients" value={user.ingredients} onChange={handleInputChange} className="ingbox"/>
            <label>Important Note</label>
			<input type="text" name="important" value={user.important} onChange={handleInputChange} />
            <label>Procedure</label>
			<input rows="10" type="text" name="procedure" value={user.procedure} onChange={handleInputChange} />
			<button>Post new Recipe</button>
		</form>
	)
}

export default AddUserForm