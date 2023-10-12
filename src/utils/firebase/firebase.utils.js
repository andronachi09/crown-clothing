import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc  } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB66xAfZ8yec2wie6BPC0CQHWohSLfcIBw",
  authDomain: "crwn-clothing-db-bfec1.firebaseapp.com",
  projectId: "crwn-clothing-db-bfec1",
  storageBucket: "crwn-clothing-db-bfec1.appspot.com",
  messagingSenderId: "119766615335",
  appId: "1:119766615335:web:cd75f3ae5ef4690278d502"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log("userSnapshot" + userSnapshot);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
           await setDoc(userDocRef, { email, displayName, createdAt });
        } catch (error) {
            console.log("An error ocurred when creating a new user", error.message);
        }
    }
};