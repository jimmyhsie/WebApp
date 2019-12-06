import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAaJRAXIpk4_xAt3ZNL1hgaIomltO4XF-U",
  authDomain: "api-project-753794405349.firebaseapp.com",
  databaseURL: "https://api-project-753794405349.firebaseio.com",
  projectId: "api-project-753794405349",
  storageBucket: "",
  messagingSenderId: "753794405349",
  appId: "1:753794405349:web:96e6c32e1db2d99e",
  measurementId: "G-CE47ZZWRXR"
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const firestore = firebase.firestore();
export const docRef = firestore.doc("test/points")
export const pointsRef = databaseRef.child("points")