<template>
  <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3">
    <NavBarComponent />

    <AsideComponent />

    <q-page-container class="bg-dark-1" style="position: relative">
      <div class="bg-chat"></div>
      <router-view />
    </q-page-container>

    <FooterComponent />
  </q-layout>
</template>

<script setup>
import FooterComponent from "src/components/FooterComponent.vue";
import NavBarComponent from "src/components/NavBarComponent.vue";
import AsideComponent from "src/components/AsideComponent.vue";
</script>
