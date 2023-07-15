<template>
  <q-chat-message
    :stamp="props.valueMessage.newTime"
    sent
    text-color="white"
    bg-color="positive"
    style="margin-left: 30%"
  >
    <div>
      {{ props.valueMessage.text }}
    </div>
  </q-chat-message>
</template>
<script setup>
const props = defineProps(["valueMessage"]);
</script>
