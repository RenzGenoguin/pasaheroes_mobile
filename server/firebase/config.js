import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCtt3Z5XZW2EakSl6RrwSXdwLRk3F6nNMg",
  authDomain: "pasaheroes-f1831.firebaseapp.com",
  projectId: "pasaheroes-f1831",
  storageBucket: "pasaheroes-f1831.appspot.com",
  messagingSenderId: "1061524938923",
  appId: "1:1061524938923:web:d29b44fad2e37e85f557ee",
  measurementId: "G-W5DBVGJS53"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export {firebase}

