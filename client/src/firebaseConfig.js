import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyANYXD03u08T7wRIE_iTRQdVE1j_g9N1Kc",
  authDomain: "capstone-test-67b09.firebaseapp.com",
  projectId: "capstone-test-67b09",
  storageBucket: "capstone-test-67b09.appspot.com",
  messagingSenderId: "850590078507",
  appId: "1:850590078507:web:01854d5394e368fa473c6e"
};

firebase.initializeApp(firebaseConfig);

export default firebase;