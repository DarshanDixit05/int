import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAO578dYemJHqhH70wQcaKRMaVMa7hRx4M",
  authDomain: "dugc7-caf3d.firebaseapp.com",
  projectId: "dugc7-caf3d",
  storageBucket: "dugc7-caf3d.appspot.com",
  messagingSenderId: "423569526699",
  appId: "1:423569526699:web:4a7b4441e0c30a83038cee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
export default firebaseConfig;