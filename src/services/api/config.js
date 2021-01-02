import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/database';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAcMLCNQvD0btTKoy9Sp6fc3zo8PmgU-hI',
//   authDomain: 'time-tracking-fd501.firebaseapp.com',
//   projectId: 'time-tracking-fd501',
//   storageBucket: 'time-tracking-fd501.appspot.com',
//   messagingSenderId: '236351979743',
//   appId: '1:236351979743:web:baf34642e31734a917e96a',
//   measurementId: 'G-77K6C3PQR8'
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBqEZbrQK2U4U5LGSXC-sBAOd_BJTPTFlU',
  authDomain: 'products-management-db74a.firebaseapp.com',
  databaseURL: 'https://products-management-db74a.firebaseio.com',
  projectId: 'products-management-db74a',
  storageBucket: 'products-management-db74a.appspot.com',
  messagingSenderId: '252959242991',
  appId: '1:252959242991:web:648745a45f86b5efb5f91a'
};
const firebaseApp = firebase.apps[0] || firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebaseApp;
