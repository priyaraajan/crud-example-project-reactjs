import firebase  from 'firebase';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCppyz4-qIYK3VB5ZPaZT0oOUltcYZU0Mw",
    authDomain: "react-cheflib.firebaseapp.com",
    databaseURL: "https://react-cheflib.firebaseio.com",
    projectId: "react-cheflib",
    storageBucket: "react-cheflib.appspot.com",
    messagingSenderId: "16176294304",
    appId: "1:16176294304:web:97b5f110ea126110b69cc5",
    measurementId: "G-3YP9LKJ9PF"
  };

  const fire = firebase.initializeApp(config);
  export default fire;