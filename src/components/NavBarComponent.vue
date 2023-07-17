<template>
  <q-header
    class="bg-dark-4 text-white"
    style="height: 55px"
    v-if="currentConversation"
  >
    <q-toolbar>
      <q-btn
        round
        flat
        icon="keyboard_arrow_left"
        class="WAL__drawer-open q-mr-sm"
        @click="toggleLeftDrawer"
      />

      <q-btn round flat v-if="currentConversation">
        <q-avatar>
          <img
            :src="
              currentConversation.uid == auth.currentUser.uid
                ? currentConversation.photoContact
                : currentConversation.photo
            "
          />
        </q-avatar>
      </q-btn>

      <span class="q-subtitle-1 q-pl-md" v-if="currentConversation">
        {{
          currentConversation.uid == auth.currentUser.uid
            ? currentConversation.displayNameContact
            : currentConversation.displayName
        }}
      </span>
      <span class="q-subtitle-1 q-pl-md" v-else> Add or select a friend </span>

      <q-space />

      <template v-if="currentConversation">
        <q-btn round flat icon="search" />
        <q-btn round flat icon="more_vert">
          <q-menu class="no-shadow" auto-close :offset="[0, 10]">
            <q-list style="min-width: 220px">
              <q-item clickable>
                <q-item-section>Contact data</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Block</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Select messages</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Silence</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Clear messages</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Erase messages</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </template>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { auth } from "src/firebase";
import { useDashboardStore } from "../stores/dashboard/dashboardStore";

const dashboardStore = useDashboardStore();
const { currentConversation, conversations } = storeToRefs(dashboardStore);

const { toggleLeftDrawer } = dashboardStore;
</script>
