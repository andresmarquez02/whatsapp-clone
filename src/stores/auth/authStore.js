import { defineStore } from "pinia";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { ref } from "vue";
import { auth, db } from "src/firebase";
import { useRouter } from "vue-router";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useAuthStore = defineStore("auth", () => {

  const user = ref(null);
  const router = useRouter();

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      existUser(result.user);
      router.push("/dashboard")
    }).catch((e) => console.log(e));
  }

  const existUser = async (user) => {
      const userRef = doc(db, "users", user.uid);
      const data = await getDoc(userRef);
      if(!data){
        setDoc(userRef, { capital: true }, { merge: true });
      } else if (!data.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          uid: user.uid,
          photo: user.photoURL
        });

      }
  }

  const logout = () => {
    user.value = null;
    signOut(auth).then((result) => router.push("/")).catch((e) => {
      console.log(e);
    });
  }

  return {
    user,
    login,
    logout
  };
});
