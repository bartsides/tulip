<script setup lang="ts">
import { Chord } from "../theory/Chords";

defineProps<{
  chord: Chord;
  on: boolean;
  keyBinding: string;
}>();
</script>
<template>
  <div class="chord-card">
    {{ chord.name }}
    <div
      class="chord-card-button unselectable"
      :class="[on ? 'chord-on' : 'chord-off']"
    >
      <div class="chord-card-circle">
        {{ keyBinding.toUpperCase() }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.chord-card {
  width: 80px;
  height: 106px;
}
.chord-card-button {
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
