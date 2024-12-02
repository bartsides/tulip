<script setup lang="ts">
import { Chord } from "../theory/Chords";

defineProps<{
  chord: Chord;
  on: boolean;
}>();
</script>
<template>
  <div class="chord-card unselectable" :class="[on ? 'chord-on' : 'chord-off']">
    <div class="chord-card-circle">
      {{ chord.name }}
    </div>
  </div>
</template>
<style scoped>
.chord-card {
  border: 1px solid white;
  border-radius: 1rem;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chord-on {
  background: rgb(156, 153, 153);
}
.chord-card-circle {
  border: 1px solid rgb(187, 187, 187);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
