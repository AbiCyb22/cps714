import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


    const firebaseConfig = {
        apiKey: "AIzaSyBqtv3ObRJewycARSJrb86xYOXkNrhCXPA",
        authDomain: "cps714-bd3d3.firebaseapp.com",
        projectId: "cps714-bd3d3",
        storageBucket: "cps714-bd3d3.firebasestorage.app",
        messagingSenderId: "525592937430",
        appId: "1:525592937430:web:b9124a1811c3a42ddd9a77"
      };
      
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);


export {db};
