// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/* Main app */
const firebaseConfig = {
  apiKey: "AIzaSyCeOT2DOIOnP5ryyykw3bMvuk77LHWHSZ4",
  authDomain: "data-personal-note.firebaseapp.com",
  databaseURL: "https://data-personal-note-default-rtdb.firebaseio.com",
  projectId: "data-personal-note",
  storageBucket: "data-personal-note.appspot.com",
  messagingSenderId: "562076076079",
  appId: "1:562076076079:web:3ada91a6169cdf48ed9eda"
};

const reCapchaConfig = {
  siteKey: '6LdIOXwnAAAAAGS_owKIRtomxBU4o1a1UQJ62L_J',
  secretKey: '6LdIOXwnAAAAAFczFlGJt3R-iKhu0aGxsv5RvIcT'
}

const token = '40DE5841-99EC-4B9E-8982-532D87FCE9F3';

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// gives us an auth instance
const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
const db = getFirestore(firebase);

// in order to use this auth instance elsewhere
const signInWithGooglePopup = () => signInWithPopup(auth, provider);
const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

self.FIREBASE_APPCHECK_DEBUG_TOKEN = token;

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
initializeAppCheck(firebase, {
  provider: new ReCaptchaV3Provider(reCapchaConfig.siteKey),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

export { auth, db, signInWithGooglePopup, signInWithGoogleRedirect };
export default firebase;
