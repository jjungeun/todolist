import * as firebase from 'firebase'

let database;

const firebaseConfig = {
  apiKey: "AIzaSyAuYepbgmOXfTuYUBsyF3vvo2yF3gS2-Bo",
  authDomain: "todolist-9afb2.firebaseapp.com",
  databaseURL: "https://todolist-9afb2.firebaseio.com",
  projectId: "todolist-9afb2",
  storageBucket: "todolist-9afb2.appspot.com",
  messagingSenderId: "79568648285",
  appId: "1:79568648285:web:04b953889c2518cc2cf5b4",
  measurementId: "G-ZT4V6BBZHY"
};

export const fire = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
}

export const createFireDB = (id, text, isCheck, color) => {
  var addTodo = {
    id: id,
    text: text,
    isCheck: isCheck,
    color: color
  };

  var newItemKey = database.ref('/').child('todoItem').push().key;
  var updates = {};
  updates['/todoItem/' + newItemKey] = addTodo;

  return database.ref().update(updates);
}

export const readFireDB = () => {
  return database.ref().child('todoItem').once('value');
}

export const updateFireDB = (id) => {
  database.ref().child('todoItem').once('value', (snapshot) => {
    snapshot.forEach((child) => {
      if (child.val().id === id) {
        const updateChild = child.val();
        child.ref.set({
          id: updateChild.id,
          text: updateChild.text,
          isCheck: !updateChild.isCheck,
          color: updateChild.color
        });
        return;
      }
    });
  })
}

export const deleteFireDB = (id) => {
  database.ref().child('todoItem').once('value', (snapshot) => {
    snapshot.forEach((child) => {
      if (child.val().id === id) {
        child.ref.remove();
        return;
      }
    });
  })
}