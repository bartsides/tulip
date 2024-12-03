<script setup lang="ts">
import Notes, { AddNote, Equals, Note } from "../theory/Notes";
import BlackKey from "./BlackKey.vue";
import WhiteKey from "./WhiteKey.vue";

const props = defineProps<{
  root: Note | null;
  octave: number;
  keyboardKeys: string[];
}>();

const emit = defineEmits<{ keyClicked: [note: Note] }>();

function getNote(num: number) {
  const baseNote = Notes[0];
  baseNote.octave = props.octave;
  return AddNote(baseNote, num);
}

function keyClicked(note: Note) {
  emit("keyClicked", note);
}
</script>
<template>
  <div class="keyboard-container">
    <WhiteKey
      class="key1"
      :note="getNote(0)"
      :pressed="Equals(getNote(0), root)"
      :bindingKey="keyboardKeys[0]"
      @keyClicked="keyClicked"
    />
    <BlackKey
      class="key2"
      :note="getNote(1)"
      :pressed="Equals(getNote(1), root)"
      :bindingKey="keyboardKeys[1]"
      @keyClicked="keyClicked"
    />
    <WhiteKey
      class="key3"
      :note="getNote(2)"
      :pressed="Equals(getNote(2), root)"
      :bindingKey="keyboardKeys[2]"
      @keyClicked="keyClicked"
    />
    <BlackKey
      class="key4"
      :note="getNote(3)"
      :pressed="Equals(getNote(3), root)"
      :bindingKey="keyboardKeys[3]"
      @keyClicked="keyClicked"
    />
    <WhiteKey
      class="key5"
      :note="getNote(4)"
      :pressed="Equals(getNote(4), root)"
      :bindingKey="keyboardKeys[4]"
      @keyClicked="keyClicked"
    />
    <WhiteKey
      class="key6"
      :note="getNote(5)"
      :pressed="Equals(getNote(5), root)"
      :bindingKey="keyboardKeys[5]"
      @keyClicked="keyClicked"
    />
    <BlackKey
      class="key7"
      :note="getNote(6)"
      :pressed="Equals(getNote(6), root)"
      :bindingKey="keyboardKeys[6]"
      @keyClicked="keyClicked"
    />
    <WhiteKey
      class="key8"
      :note="getNote(7)"
      :pressed="Equals(getNote(7), root)"
      :bindingKey="keyboardKeys[7]"
      @keyClicked="keyClicked"
    />
    <BlackKey
      class="key9"
      :note="getNote(8)"
      :pressed="Equals(getNote(8), root)"
      :bindingKey="keyboardKeys[8]"
      @keyClicked="keyClicked"
    />
    <WhiteKey
      class="key10"
      :note="getNote(9)"
      :pressed="Equals(getNote(9), root)"
      :bindingKey="keyboardKeys[9]"
      @keyClicked="keyClicked"
    />
    <BlackKey
      class="key11"
      :note="getNote(10)"
      :pressed="Equals(getNote(10), root)"
      :bindingKey="keyboardKeys[10]"
      @keyClicked="keyClicked"
    />
    <WhiteKey
      class="key12"
      :note="getNote(11)"
      :pressed="Equals(getNote(11), root)"
      :bindingKey="keyboardKeys[11]"
      @keyClicked="keyClicked"
    />
  </div>
</template>
<style scoped>
.keyboard-container {
  min-width: 405px;
  max-width: 405px;
  display: inline-flex;
}
.black-key {
  top: -22px;
}
.key1 {
  position: relative;
  left: 0px;
}
.key2 {
  position: relative;
  left: -20px;
}
.key3 {
  position: relative;
  left: -32px;
}
.key4 {
  position: relative;
  left: -46px;
}
.key5 {
  position: relative;
  left: -64px;
}
.key6 {
  position: relative;
  left: -62px;
}
.key7 {
  position: relative;
  left: -82px;
}
.key8 {
  position: relative;
  left: -94px;
}
.key9 {
  position: relative;
  left: -110px;
}
.key10 {
  position: relative;
  left: -126px;
}
.key11 {
  position: relative;
  left: -138px;
}
.key12 {
  position: relative;
  left: -158px;
}
</style>
