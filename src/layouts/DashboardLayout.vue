<template>
  <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3">
    <NavBarComponent />

    <AsideComponent />

    <q-page-container
      :class="currentConversation ? 'bg-dark-1' : 'bg-dark-4'"
      style="position: relative"
    >
      <div class="bg-chat" v-if="currentConversation"></div>
      <router-view />
    </q-page-container>

    <FooterComponent />
  </q-layout>
</template>

<script setup>
import FooterComponent from "src/components/FooterComponent.vue";
import NavBarComponent from "src/components/NavBarComponent.vue";
import AsideComponent from "src/components/AsideComponent.vue";
import { useDashboardStore } from "src/stores/dashboard/dashboardStore";
import { storeToRefs } from "pinia";

const dashboardStore = useDashboardStore();
const { currentConversation } = storeToRefs(dashboardStore);
</script>
