import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCNbJDLdQSSO-TO3TsGJrCc2IPqjdo1f0E",
    authDomain: "crown-db-671a8.firebaseapp.com",
    databaseURL: "https://crown-db-671a8.firebaseio.com",
    projectId: "crown-db-671a8",
    storageBucket: "crown-db-671a8.appspot.com",
    messagingSenderId: "462058711880",
    appId: "1:462058711880:web:b99e3e7b75a90a0ed2a17d",
    measurementId: "G-F91XQL29BF"
};

export const createUserProfileDocument = async (userAuth, addionalData) => {
if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try {
await userRef.set({
    displayName,
    email,
    createAt,
    ...addionalData
})
    } catch (err) {
        console.log('error creating user, err.message')
    }
}
return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;