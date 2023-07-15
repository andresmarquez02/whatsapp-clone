<template>
  <router-view />
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

$q.dark.set(true);

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useAuthStore } from "./stores/auth/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

onAuthStateChanged(auth, (getUser) => {
  if (getUser) {
    user.value = getUser;
  } else {
  }
});
</script>
