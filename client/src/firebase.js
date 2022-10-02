import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  onSnapshot,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATp0In7zWRnVbnioItCapygtsF1s6NNIo",
  authDomain: "alphabox-60d30.firebaseapp.com",
  projectId: "alphabox-60d30",
  storageBucket: "alphabox-60d30.appspot.com",
  messagingSenderId: "88447405167",
  appId: "1:88447405167:web:a6870c920ded2f7a8bd19a",
  measurementId: "G-JRSV4F6037",
};

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const db = firebase.firestore();

// ------ Function to setup notebook collection and documents when an account is created ------
function notebookSetup(user) {
  db.collection("users")
    .doc(user.email)
    .collection("notebook")
    .doc("tags")
    .set({ tags: [] });
}

const addJournalEntry = async(m, d) => {
  return db.collection("users")
    .doc(auth.currentUser.email)
    .collection("journal")
    .add({message: m, date: d})
}

const getJournalEntries = async () => {
  let journalDBRef = query(collection(db, 'users', auth.currentUser.email,'journal'))
  const querySnapshot = await getDocs(journalDBRef)
  let journals = []
  querySnapshot.forEach((doc) => {
    let d = doc.data()
    d.id = doc.id
    journals.push(d)
  });
  return journals
}

const deleteJournalEntry = async (id) => {
  await deleteDoc(doc(db, 'users',auth.currentUser.email,'journal', id))
}

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    db.collection("users").doc(user.email).set({
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
    notebookSetup(user);
    console.log("User check 2: " + user);
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await updateProfile(user, {
      displayName: name
    });
    
    db.collection("users").doc(user.email).set({
      uid: user.uid,
      name,
      authProvider: "local",
      email: user.email,
    });
    notebookSetup(user);
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  console.log("Logged out");
  window.location.reload(false);
};

//push to the database
const fillCalendar = async (notes) => {
  try {
    const docs = await db.collection('notebook').get();
    // const docs = await getDocs(q);
    console.log('>> docs', docs.size)
    if (docs.size < 5) {
      // await Promise.all(
        // notes.map((note) => addDoc(collection(db, "notebook"), note))
      // );
    }
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};
//read data from db
const getEntries = async () => {
  try {
    const res = await db.collection('users').doc(auth.currentUser.email).collection('journal').get();
    return res.docs.map((doc) => doc.data());
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};

// ToDo functions
const addTodo = async (t, c) => {
  return db
    .collection("users")
    .doc(auth.currentUser.email)
    .collection("todo")
    .add({ task: t, completed: c });
};

const getTodo = async () => {
  let todoDBRef = query(
    collection(db, "users", auth.currentUser.email, "todo")
  );
  const querySnapshot = await getDocs(todoDBRef);
  let tasks = [];
  querySnapshot.forEach((doc) => {
    let d = doc.data();
    //d.id = doc.id;
    tasks.push(d);
  });
  //console.log(tasks);
  return tasks;
};

const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "users", auth.currentUser.email, "todo", id));
};

const deleteTask = async (id) => {
  await deleteDoc(doc(db, "users", auth.currentUser.email, "todos", id));
};

export {
  firebase,
  auth,
  addDoc,
  db,
  collection,
  getDocs,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  fillCalendar,
  getEntries,
  addJournalEntry,
  getJournalEntries,
  deleteJournalEntry,
  getTodo,
  addTodo,
  deleteTodo,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
  deleteTask
};
