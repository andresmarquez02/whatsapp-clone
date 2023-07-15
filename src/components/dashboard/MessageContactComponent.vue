<template>
  <q-chat-message bg-color="dark" stamp="7 minutes ago" text-color="white">
    <div>
      {{ props.valueMessage.text }}
    </div>
  </q-chat-message>
</template>
<script setup>
const props = defineProps(["valueMessage"]);
</script>
