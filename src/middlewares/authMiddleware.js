import { onAuthStateChanged } from "firebase/auth";
import { storeToRefs } from "pinia";
import { auth } from "src/firebase";
import { useAuthStore } from "src/stores/auth/authStore";

export default function authMiddleware(to, from, next) {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);


  onAuthStateChanged(auth, (getUser) => {
    if (getUser) {
      user.value = getUser;
    } else {
    }

    if (to.meta.requiresAuth && !user.value) {
      next('/');
    } else {
      next();
    }

  });

}
