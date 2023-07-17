<template>
  <q-footer class="bg-dark-4" v-if="currentConversation">
    <q-toolbar class="row flex flex-center q-py-sm">
      <q-btn round flat icon="insert_emoticon" class="q-mr-sm text-grey-5" />
      <q-input
        dark
        rounded
        standout="bg-dark text-white"
        v-model="message"
        class="col-grow"
        placeholder="Type a message"
        @keyup.enter="addMessage"
      >
        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="send"
            type="submit"
            @click="addMessage"
          />
        </template>
      </q-input>
      <q-btn round flat icon="mic" @click="record" class="text-grey-5" />
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useDashboardStore } from "../stores/dashboard/dashboardStore";

const dashboardStore = useDashboardStore();
const { message, currentConversation } = storeToRefs(dashboardStore);
const { addMessage } = dashboardStore;
const record = ref();
</script>
