<script setup lang="ts">
import { Note } from "../theory/Notes";

defineProps<{ note: Note; pressed: boolean; bindingKey: string }>();
</script>
<template>
  <div class="white-key" :class="[pressed ? 'white-key-pressed' : '']">
    <div class="key-binding unselectable">{{ bindingKey.toUpperCase() }}</div>
  </div>
</template>
<style scoped>
.white-key {
  border: 1px solid white;
  width: 54px;
  height: 300px;
  background: grey;
  display: flex;
  align-items: end;
  justify-items: center;
}
.white-key-pressed {
  background: rgb(196, 196, 196);
}
.key-binding {
  width: 100%;
}
</style>
