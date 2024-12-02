<script setup lang="ts">
import { Mod } from "../theory/Mods";

defineProps<{
  mod: Mod;
  on: boolean;
}>();
</script>
<template>
  <div class="mod-card unselectable" :class="[on ? 'mod-on' : 'mod-off']">
    {{ mod.name }}
  </div>
</template>
<style scope>
.mod-card {
  border: 1px solid white;
  border-radius: 1rem;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mod-on {
  background: rgb(156, 153, 153);
}
</style>
