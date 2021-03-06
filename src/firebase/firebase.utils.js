import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAj5NGFCFkikv-HyXC92ElVLAjSNCiSzYE",
    authDomain: "crwn-db-c902a.firebaseapp.com",
    projectId: "crwn-db-c902a",
    storageBucket: "crwn-db-c902a.appspot.com",
    messagingSenderId: "317550526104",
    appId: "1:317550526104:web:47d2169b9ae1eba6f9daed",
    measurementId: "G-EHCG1Y6FF6"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log("Error creating users ...", error.message)
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
