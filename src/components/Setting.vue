<script setup lang="ts">
const props = defineProps<{
  name: string;
  value: number;
  min: number;
  max: number;
}>();
const emit = defineEmits<{ valueChanged: [val: number] }>();
function changeValue(increment: number) {
  let val = props.value + increment;
  val = Math.max(val, props.min);
  val = Math.min(val, props.max);
  emit("valueChanged", val);
}
</script>
<template>
  <div class="setting">
    <div class="setting-title">
      {{ name }}
    </div>
    <div class="setting-holder unselectable">
      <div class="incrementer" @click="changeValue(-1)">◀</div>
      <div class="silkscreen-regular">{{ value }}</div>
      <div class="incrementer" @click="changeValue(1)">▶</div>
    </div>
  </div>
</template>
<style scoped>
.setting {
  display: inline-flex;
  flex-direction: column;
  min-width: 40px;
}
.setting-title {
  font-size: 18px;
}
.setting-holder {
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 20px;
}
.incrementer {
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
</style>
