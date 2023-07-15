<template>
  <q-item-section avatar>
    <q-avatar>
      <img :src="user.photo" />
    </q-avatar>
  </q-item-section>

  <q-item-section>
    <q-item-label lines="1" class="text-subtitle1 text-weight-light">
      {{ user.displayName }}
    </q-item-label>
    <q-item-label class="text-blue-grey-5" caption>
      <span class="text-body2">{{ user.lastMessage.substring(-1, 50) }}</span>
    </q-item-label>
  </q-item-section>

  <q-item-section side>
    <q-item-label caption>
      {{ user.newTime }}
    </q-item-label>
    <q-icon name="keyboard_arrow_down" />
  </q-item-section>
</template>
<script setup>
const props = defineProps(["user"]);
</script>
