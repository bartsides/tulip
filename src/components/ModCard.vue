<script setup lang="ts">
import { Mod } from "../theory/Mods";

defineProps<{
  mod: Mod;
  on: boolean;
  keyBinding: string;
}>();
</script>
<template>
  <div class="mod-card">
    <div
      class="mod-card-button unselectable"
      :class="[on ? 'mod-on' : 'mod-off']"
    >
      <div class="mod-card-circle">
        {{ keyBinding.toUpperCase() }}
      </div>
    </div>
    {{ mod.name }}
  </div>
</template>
<style scoped>
.mod-card {
  width: 80px;
  height: 106px;
  cursor: pointer;
}
.mod-card-button {
  border: 1px solid white;
  border-radius: 1rem;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mod-on {
  background: rgb(156, 153, 153);
}
.mod-card-circle {
  border: 1px solid rgb(187, 187, 187);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
