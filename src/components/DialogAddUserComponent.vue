<template>
  <q-dialog v-model="cardAddUser">
    <q-card style="width: 500px; max-width: 70vw">
      <q-toolbar>
        <q-toolbar-title>Add Contact</q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section v-if="!error">
        <q-list v-if="loading">
          <q-item class="row" v-for="item of 5" :key="item">
            <q-skeleton type="QAvatar" animation="wave" />
            <q-skeleton class="col q-ml-md" type="rect" animation="wave" />
          </q-item>
        </q-list>
        <q-list v-else>
          <q-item v-ripple v-for="user of usersAdd" :key="user.uid">
            <q-item-section avatar>
              <q-avatar>
                <img :src="user.photo" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ user.displayName }}</q-item-section>
            <q-item-section> </q-item-section>
            <q-btn
              flat
              color="primary"
              label="Message"
              @click="messageUser(user)"
            />
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section v-else>
        <h5 class="text-center">Opps... No registered users yet</h5>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { collection, getDocs } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { auth, db } from "src/firebase";
import { useDashboardStore } from "src/stores/dashboard/dashboardStore";
import { ref } from "vue";

const dashboardStore = useDashboardStore();
const { cardAddUser, leftDrawerOpen } = storeToRefs(dashboardStore);
const { setCurrentConversation } = dashboardStore;
const usersAdd = ref([]);
const error = ref(false);
const loading = ref(true);

const getUsers = async () => {
  const queryUsers = await getDocs(collection(db, "users"));
  queryUsers.forEach((doc) => {
    if (doc.data().uid !== auth.currentUser.uid) {
      usersAdd.value = [...usersAdd.value, doc.data()];
    }
  });
  loading.value = false;
  if (usersAdd.value.length === 0) {
    error.value = true;
  }
};

const messageUser = (user) => {
  leftDrawerOpen.value = false;
  setCurrentConversation(user);
  cardAddUser.value = false;
  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth",
  });
};

getUsers();
</script>
