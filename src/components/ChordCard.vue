<script setup lang="ts">
import { Chord } from "../theory/Chords";

defineProps<{
  chord: Chord;
  on: boolean;
}>();
</script>
<template>
  <div class="chord-card unselectable" :class="[on ? 'chord-on' : 'chord-off']">
    {{ chord.name }}
  </div>
</template>
<style scope>
.chord-card {
  border: 1px solid white;
  border-radius: 1rem;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chord-on {
  background: rgb(156, 153, 153);
}
</style>
