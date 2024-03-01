import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAovtURtW21Ij_uTNVAu-BGRKZxr9esDMk",
  authDomain: "imageuploadforthesises.firebaseapp.com",
  projectId: "imageuploadforthesises",
  storageBucket: "imageuploadforthesises.appspot.com",
  messagingSenderId: "255663088615",
  appId: "1:255663088615:web:5b31db93cd972fdeadd342",
};

if(!firebase){
  firebase.initializeApp(firebaseConfig)
}

export {firebase}

