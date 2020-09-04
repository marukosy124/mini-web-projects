import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBGZ4NGRdisbjxoL1OsU-cUtecqrzJE2Ho",
  authDomain: "shop-review-app.firebaseapp.com",
  databaseURL: "https://shop-review-app.firebaseio.com",
  projectId: "shop-review-app",
  storageBucket: "shop-review-app.appspot.com",
  messagingSenderId: "973201264622",
  appId: "1:973201264622:web:397783d1808f3b165588ff",
  measurementId: "G-JW5CERC2ZF",
};

firebase.initializeApp(firebaseConfig)

firebase.firestore()

export default firebase
