<script setup lang="ts">
import { Note } from "../theory/Notes";

defineProps<{ note: Note; pressed: boolean; bindingKey: string }>();
const emit = defineEmits<{ keyClicked: [note: Note] }>();
</script>
<template>
  <div
    @click.native="emit('keyClicked', note)"
    class="black-key"
    :class="[pressed ? 'black-key-pressed' : '']"
  >
    <div class="key-binding unselectable">{{ bindingKey.toUpperCase() }}</div>
  </div>
</template>
<style scoped>
.black-key {
  border: 1px solid white;
  border-radius: 4px;
  min-width: 32px;
  height: 172px;
  background: black;
  z-index: 2;
  display: flex;
  align-items: end;
  justify-items: center;
  padding-bottom: 5px;
}
.black-key-pressed {
  background: rgb(54, 54, 54);
}
.key-binding {
  width: 100%;
}
</style>
