import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD822IexiGyP8RjaGj5waDjkiUtc1ffDTY",
    authDomain: "revents-57c58.firebaseapp.com",
    databaseURL: "https://revents-57c58.firebaseio.com",
    projectId: "revents-57c58",
    storageBucket: "revents-57c58.appspot.com",
    messagingSenderId: "62551021500"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const settings = {
    timestampsInSnapshots: true
}

firestore.settings(settings)

export default firebase;