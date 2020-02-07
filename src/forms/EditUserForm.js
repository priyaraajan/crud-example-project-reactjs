import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
      }}
    >
      <label>Dish name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Type</label>
      <input type="text" name="type" value={user.type} onChange={handleInputChange} />
      <label>Ingredients</label>
      <input type="text" name="ingredients" value={user.ingredients} onChange={handleInputChange} />
      <label>Important Note:</label>
      <input type="text" name="important" value={user.important} onChange={handleInputChange} />
      <label>Procedure</label>
      <textarea rows="10" type="text" name="procedure" value={user.procedure} onChange={handleInputChange} />
      <button>Update Recipe</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm