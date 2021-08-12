import './App.css'
import 'firebase/database'
import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import Button from './components/Button';
import {useState,useEffect} from 'react'
import Channel from './components/Channel';


firebase.initializeApp({
  apiKey: "AIzaSyDunNey_lStUgdOsaL_OyEMUiHIrK76bt8",
  authDomain: "super-chat-ecd94.firebaseapp.com",
  projectId: "super-chat-ecd94",
  storageBucket: "super-chat-ecd94.appspot.com",
  messagingSenderId: "885876664579",
  appId: "1:885876664579:web:673e074a141fb9734ba136",
  measurementId: "G-9ZJF917LVT"
});
const auth = firebase.auth()
const db = firebase.firestore()

function App() {
  const [user,setuser] = useState(() => auth.currentUser)
  const [ initializing,setInitializing] = useState(true)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setuser(user);
      }else{
        setuser(null)
      }
      if(initializing){
        setInitializing(false)
      }
    })
    return unsubscribe
  },[])

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage()
    try{
      await auth.signInWithPopup(provider)
    } catch(error){
      console.log(error)
    }
  }
  if(initializing){
    return "loading...."
  }

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    }catch(error){
      console.log(error.message)
    }
  }
  return (
    <div>
      {
        user ? (
          <div className="main">
          <Button  onClick={signOut}>Sign Out</Button>
          <Channel user={user} db={db}/>
          </div>
        ) : (
          <div className="welcomescreen">
          <p className="welcome text-light my-5">Welcome to the Chat</p>
          <Button className="button" onClick={signInWithGoogle}>Sign in with Google</Button>
          </div>
        )
      }
    </div>
  );
}

export default App;
