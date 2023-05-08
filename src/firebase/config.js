import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAwszyQ24dLVK-gzXlhxXv7qp-Om5_V_Nw",
  authDomain: "udemy-vue-firebase-77cd1.firebaseapp.com",
  projectId: "udemy-vue-firebase-77cd1",
  storageBucket: "udemy-vue-firebase-77cd1.appspot.com",
  messagingSenderId: "863404002760",
  appId: "1:863404002760:web:80e52e23e7ff925e80c4fd"
};


  //init firebase
  firebase.initializeApp(firebaseConfig)


  const projectAuth = firebase.auth()
  const projectFirestore = firebase.firestore()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, timestamp, projectAuth}