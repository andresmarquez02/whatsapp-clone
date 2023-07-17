<template>
  <q-page class="q-pa-md" v-if="currentConversation">
    <div class="q-pa-md row justify-center w-100">
      <div class="w-100">
        <template v-for="(item, index) of messages" :key="index">
          <template v-if="item.uid == auth.currentUser.uid">
            <MessageMeComponent :valueMessage="item" />
          </template>
          <template v-else>
            <MessageContactComponent :valueMessage="item" />
          </template>
        </template>
      </div>
    </div>
  </q-page>
  <q-page class="q-pa-md flex flex-center" style="align-items: center" v-else>
    <NotChatComponent />
  </q-page>
</template>

<script setup>
import { useDashboardStore } from "../stores/dashboard/dashboardStore";
import { storeToRefs } from "pinia";
import MessageMeComponent from "components/dashboard/MessageMeComponent.vue";
import MessageContactComponent from "components/dashboard/MessageContactComponent.vue";
import { auth } from "src/firebase";
import { onMounted } from "vue";
import NotChatComponent from "src/components/NotChatComponent.vue";

const dashboardStore = useDashboardStore();
const { currentConversation, messages } = storeToRefs(dashboardStore);
const { getConversations } = dashboardStore;

onMounted(() => {
  getConversations();
});
</script>

<style lang="scss">
.w-100 {
  width: 100%;
}
</style>
