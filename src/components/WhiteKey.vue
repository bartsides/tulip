<script setup lang="ts">
import { Note } from "../theory/Notes";

defineProps<{
  note: Note;
  pressed: boolean;
  bindingKey: string;
}>();

const emit = defineEmits<{ keyClicked: [note: Note] }>();
</script>
<template>
  <div
    @click.native="emit('keyClicked', note)"
    class="white-key"
    :class="[pressed ? 'white-key-pressed' : '']"
  >
    <div class="key-binding unselectable">{{ bindingKey.toUpperCase() }}</div>
  </div>
</template>
<style scoped>
.white-key {
  border: 1px solid white;
  border-radius: 4px;
  min-width: 52px;
  max-width: 52px;
  height: 254px;
  background: grey;
  display: flex;
  align-items: end;
  justify-items: center;
  padding-bottom: 5px;
  cursor: pointer;
}
.white-key-pressed {
  background: rgb(196, 196, 196);
}
.key-binding {
  width: 100%;
}
</style>
