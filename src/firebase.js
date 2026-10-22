
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword,signOut} from "firebase/auth"
import { addDoc,collection,getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCen6hORTnODXGX6p3yIrvincHJ7VYvFjI",
  authDomain: "netflix-clone-a40f4.firebaseapp.com",
  projectId: "netflix-clone-a40f4",
  storageBucket: "netflix-clone-a40f4.firebasestorage.app",
  messagingSenderId: "606190186911",
  appId: "1:606190186911:web:49f728b2591d3d7deb4daa",
  measurementId: "G-0TZ15W042C"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db= getFirestore(app)

const signup =async(name,email,password)=>{
    try{
       const res = await createUserWithEmailAndPassword(auth,email,password)
       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       })
    }catch(error){

        console.log (error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
     

    }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    
  }
}

const logout = () => {
  signOut(auth);
};


export { auth, db, login, signup, logout };