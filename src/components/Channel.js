import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import Message from "./Message";
import styles from "./channel.module.css"

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage,setNewMessages] = useState('');
  const {uid,displayName,photoURL} = user;

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
          console.log(data);
        });
      return unsubscribe;
    }
  }, [db]);
  const handleonchange = e => {
      setNewMessages(e.target.value)
  }
  const handleonsubmit = e => {
      setNewMessages('')
      e.preventDefault();
    
      if(db){
          db.collection("messages").add({
              text: newMessage,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              uid,
              displayName,
              photoURL
          })
      }
  }


  return (
    <div className={styles.behind}>
      <ul className={styles.messagelist}>
        {messages.map((message) => (
          <li key={message.id}>
              <Message {...message}/>
          </li>
        ))}
      </ul>
      <form onSubmit={handleonsubmit} className="d-flex d-stick">
        <input type="text" value={newMessage} classname="d-flex" onChange={handleonchange} placeholder="Enter your message"/>
        <button className="btn btn-primary" type="submit" disabled={!newMessage}>Send</button>
      </form>
    </div>
  );
};
export default Channel;
