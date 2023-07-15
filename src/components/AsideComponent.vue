<template>
  <q-drawer
    v-model="leftDrawerOpen"
    class="border-drawer"
    show-if-above
    :breakpoint="1020"
    :width="500"
  >
    <q-toolbar class="bg-dark-4" style="height: 55px">
      <q-avatar class="cursor-pointer">
        <img :src="user.photoURL" />
      </q-avatar>
      <span class="q-ml-sm">{{ user.displayName }}</span>
      <q-space />

      <q-btn
        round
        flat
        icon="group"
        class="text-grey-4"
        @click="cardAddUser = true"
      />
      <!-- <q-btn round flat icon="message" class="text-grey-4" /> -->
      <q-btn round flat icon="more_vert" class="text-grey-4">
        <q-menu class="no-shadow" auto-close :offset="[190, 7]">
          <q-list style="min-width: 220px">
            <q-item clickable>
              <q-item-section>New Group</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>New community</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Messages featured</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Select Chat</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-item clickable @click="logout">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>

    <q-toolbar class="bg-dark-2 toolbar-chat">
      <q-input
        dark
        rounded
        standout="bg-dark text-white"
        class="full-width q-py-sm"
        bottom-slots
        v-model="search"
        placeholder="Search for a chat or start a new one"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>

    <q-scroll-area
      style="height: calc(100% - 111px)"
      v-if="conversations.length > 0"
      class="bg-dark-2"
    >
      <q-list>
        <q-item
          class="q-py-md border-item-chat"
          v-for="(conversation, index) in conversations"
          :key="index"
          clickable
          v-ripple
          @click="setCurrentConversation(conversation)"
        >
          <template v-if="conversation.uid == auth.currentUser.uid">
            <ItemComponent
              :user="{
                photo: conversation.photoContact,
                displayName: conversation.displayNameContact,
                lastMessage: conversation.lastMessage,
                newTime: conversation.newTime,
              }"
            />
          </template>
          <template v-else>
            <ItemComponent
              :user="{
                photo: conversation.photo,
                displayName: conversation.displayName,
                lastMessage: conversation.lastMessage,
                newTime: conversation.newTime,
              }"
            />
          </template>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-scroll-area
      style="height: calc(100% - 111px)"
      class="bg-dark-2 aside-chat-none q-pb-xl"
      v-else
    >
      <q-list class="q-mb-xl">
        <q-item class="q-mb-lg">
          <div class="text-center" style="font-size: 20px">
            <div class="q-mb-md">
              <q-icon name="las la-phone-slash" size="lg"></q-icon>
            </div>
            <div>You haven't started a conversation yet</div>
          </div>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
  <DialogAddUserComponent />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../stores/dashboard/dashboardStore";
import { useAuthStore } from "../stores/auth/authStore";
import DialogAddUserComponent from "./DialogAddUserComponent.vue";
import ItemComponent from "./ItemComponent.vue";
import { auth } from "src/firebase";

const dashboardStore = useDashboardStore();
const { leftDrawerOpen, search, conversations, cardAddUser } =
  storeToRefs(dashboardStore);

const { toggleLeftDrawer, setCurrentConversation } = dashboardStore;
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { logout } = authStore;
</script>
<style lang="scss">
.toolbar-chat .q-field__control {
  height: 40px;
  font-size: 13px;
}
.toolbar-chat .q-field__marginal {
  height: 40px;
  font-size: 20px;
}
.aling-center {
  align-items: center;
}
.aside-chat-none {
  display: grid;
}
.aside-chat-none .q-scrollarea__content {
  display: grid;
  justify-items: center;
  align-content: center;
}
</style>
