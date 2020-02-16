import firebase  from 'firebase';
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "https://react-cheflib.firebaseio.com",
    projectId: "react-cheflib",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "
  };

  const fire = firebase.initializeApp(config);

  export default fire;
