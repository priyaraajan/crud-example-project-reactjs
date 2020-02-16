import React, { useState, useEffect } from 'react'
import firebase from '../config/fire'


const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

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

  const handChange = event=>{
		const file = event.target.files[0];
         if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setImage(file);
      } return null
	}
}

const handleUpload = () => {
  const storage = firebase.storage();
  if (image) {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
    "state_changed",
    () => {
      storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        setUrl(url);
      });
    }
    );
  }
  };

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
      <input type="file" onChange={handChange}/>
            <button onClick={handleUpload}>Upload</button>
            <br/>
            <img src={url} name ="url" alt="Uploaded images" height="30" width="40"/>
		    <p>{url}</p>
			<label>url</label>
			<input type="text" name="url" value={user.url} onChange={handleInputChange}/>
      <label>Short Description</label>
      <input type="text" name="desc" value={user.desc} onChange={handleInputChange} />
      <label>Ingredients</label>
      <input type="text" name="ingredients" value={user.ingredients} onChange={handleInputChange} />
      <label>Important Note:</label>
      <input type="text" name="important" value={user.important} onChange={handleInputChange} />
      <label>Procedure</label>
      <textarea rows="10" type="text" name="procedure" value={user.procedure} onChange={handleInputChange} />
      <label>Author</label>
      <input type="text" name="author" value={user.author} onChange={handleInputChange} />
      
      <button>Update Recipe</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm