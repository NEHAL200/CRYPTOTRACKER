import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import firebaseConfig from "./Config/firebase";

const firebaseApp=initializeApp(firebaseConfig);

//for authentication
const auth=getAuth(firebaseApp);
const database=getFirestore(firebaseApp);

export {auth,database};