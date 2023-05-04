import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAxEtKY6qsNf8IYzFE2-tW6wt6N1Z81Hgw",
  authDomain: "elappen-cfb8e.firebaseapp.com",
  projectId: "elappen-cfb8e",
  storageBucket: "elappen-cfb8e.appspot.com",
  messagingSenderId: "891366742568",
  appId: "1:891366742568:web:645b01ca27ea38a9b9331d"
};


  //init firebase
  firebase.initializeApp(firebaseConfig)


  const projectAuth = firebase.auth()
  const projectFirestore = firebase.firestore()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, timestamp, projectAuth}