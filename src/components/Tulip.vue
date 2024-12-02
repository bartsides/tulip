<script setup lang="ts">
import { reactive } from "vue";
import { SynthEngine } from "../SynthEngine";
import Chords, { Chord } from "../theory/Chords";
import Mods, { Mod } from "../theory/Mods";
import Notes, { Equals, Note } from "../theory/Notes";
import ChordCard from "./ChordCard.vue";
import ModCard from "./ModCard.vue";

const chordKeys = ["a", "s", "d", "f"];
const modKeys = ["z", "x", "c", "v"];
const keyboardKeys = ["j", "k", "l", ";"];
const synthEngine = new SynthEngine();

const state = reactive<{
  root: Note | null;
  chord: Chord | null;
  octave: number;
  mod1: Mod;
  mod2: Mod;
  mod3: Mod;
  mod4: Mod;
  mod1On: boolean;
  mod2On: boolean;
  mod3On: boolean;
  mod4On: boolean;
}>({
  root: null,
  chord: null,
  octave: 3,
  mod1: Mods[0],
  mod2: Mods[1],
  mod3: Mods[2],
  mod4: Mods[3],
  mod1On: false,
  mod2On: false,
  mod3On: false,
  mod4On: false,
});

function getNoteForKey(key: string): Note {
  if (key === keyboardKeys[0]) return Notes[3]; // C
  if (key === keyboardKeys[1]) return Notes[4];
  if (key === keyboardKeys[2]) return Notes[5];
  if (key === keyboardKeys[3]) return Notes[6];
  throw new Error(`Couldn't get note for key '${key}''`);
}

function getChordForKey(key: string): Chord {
  for (let i = 0; i < chordKeys.length; i++)
    if (key === chordKeys[i]) return Chords[i];
  throw new Error(`Couldn't get chord for key '${key}''`);
}

function getModForKey(key: string): number {
  for (let i = 0; i < modKeys.length; i++) if (key === modKeys[i]) return i;
  throw new Error(`Couldn't get mod for key '${key}''`);
}

function changeChord(chord: Chord | null) {
  state.chord = synthEngine.changeChord(chord);
}

function toggleChord(chord: Chord) {
  state.chord = synthEngine.toggleChord(chord);
}

function addMod(num: number) {
  synthEngine.addMod(num);
  if (num === 0) state.mod1On = true;
  else if (num === 1) state.mod2On = true;
  else if (num === 2) state.mod3On = true;
  else if (num === 3) state.mod4On = true;
}

function removeMod(num: number) {
  synthEngine.removeMod(num);
  if (num === 0) state.mod1On = false;
  else if (num === 1) state.mod2On = false;
  else if (num === 2) state.mod3On = false;
  else if (num === 3) state.mod4On = false;
}

function toggleMod(num: number) {
  if (num === 0) {
    if (state.mod1On) removeMod(num);
    else addMod(num);
  } else if (num === 1) {
    if (state.mod2On) removeMod(num);
    else addMod(num);
  } else if (num === 2) {
    if (state.mod3On) removeMod(num);
    else addMod(num);
  } else if (num === 3) {
    if (state.mod4On) removeMod(num);
    else addMod(num);
  }
}

window.addEventListener("keydown", (e) => {
  if (keyboardKeys.includes(e.key))
    state.root = synthEngine.changeRootNote(getNoteForKey(e.key));
  else if (chordKeys.includes(e.key))
    state.chord = synthEngine.changeChord(getChordForKey(e.key));
  else if (modKeys.includes(e.key)) {
    addMod(getModForKey(e.key));
  } else if (e.key === " ") {
    synthEngine.release();
  }
});
window.addEventListener("keyup", (e) => {
  if (keyboardKeys.includes(e.key)) {
    if (Equals(state.root, getNoteForKey(e.key))) {
      state.root = synthEngine.changeRootNote(null);
    }
  } else if (chordKeys.includes(e.key)) {
    if (state.chord?.name == getChordForKey(e.key).name) {
      changeChord(null);
    }
  } else if (modKeys.includes(e.key)) {
    removeMod(getModForKey(e.key));
  }
});
</script>

<template>
  <div class="buttons">
    <div class="chord-buttons">
      <ChordCard
        v-for="i in [0, 1, 2, 3]"
        :on="state.chord?.name === Chords[i].name"
        :chord="Chords[i]"
        @click.native="toggleChord(Chords[i])"
      />
    </div>
    <div class="mod-buttons">
      <ModCard
        :on="state.mod1On"
        :mod="state.mod1"
        @click.native="toggleMod(0)"
      />
      <ModCard
        :on="state.mod2On"
        :mod="state.mod2"
        @click.native="toggleMod(1)"
      />
      <ModCard
        :on="state.mod3On"
        :mod="state.mod3"
        @click.native="toggleMod(2)"
      />
      <ModCard
        :on="state.mod4On"
        :mod="state.mod4"
        @click.native="toggleMod(3)"
      />
    </div>
  </div>
  <div class="keys"></div>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.chord-buttons,
.mod-buttons {
  display: inline-flex;
  gap: 4px;
}
</style>
