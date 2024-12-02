<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from "vue";
import { SynthEngine } from "../SynthEngine";
import Chords, { Chord } from "../theory/Chords";
import Mods, { Mod } from "../theory/Mods";
import Notes, { AddNote, Note } from "../theory/Notes";
import ChordCard from "./ChordCard.vue";
import Keyboard from "./Keyboard.vue";
import ModCard from "./ModCard.vue";

const chordKeys = ["a", "s", "d", "f"];
const modKeys = ["z", "x", "c", "v"];
const keyboardKeys = [
  "g",
  "y",
  "h",
  "u",
  "j",
  "k",
  "o",
  "l",
  "p",
  ";",
  "[",
  "'",
];
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
  notes: string;
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
  notes: "",
});

function getNoteForKey(key: string): Note {
  let baseNote = Notes[0];
  baseNote.octave = state.octave;
  return AddNote(baseNote, keyboardKeys.indexOf(key));
}

function getChordForKey(key: string): Chord {
  return Chords[chordKeys.indexOf(key)];
}

function getModForKey(key: string): number {
  return modKeys.indexOf(key);
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

function keydown(e: KeyboardEvent) {
  if (keyboardKeys.includes(e.key))
    state.root = synthEngine.changeRootNote(getNoteForKey(e.key));
  else if (chordKeys.includes(e.key))
    state.chord = synthEngine.changeChord(getChordForKey(e.key));
  else if (modKeys.includes(e.key)) {
    addMod(getModForKey(e.key));
  } else if (e.key === " ") {
    synthEngine.release();
  }
  state.notes = synthEngine.getNotes();
}

function keyup(e: KeyboardEvent) {
  if (keyboardKeys.includes(e.key)) {
    if (state.root?.name == getNoteForKey(e.key).name) {
      state.root = synthEngine.changeRootNote(null);
    }
  } else if (chordKeys.includes(e.key)) {
    if (state.chord?.name == getChordForKey(e.key).name) {
      changeChord(null);
    }
  } else if (modKeys.includes(e.key)) {
    removeMod(getModForKey(e.key));
  }
  state.notes = synthEngine.getNotes();
}

onMounted(() => {
  window.removeEventListener("keydown", keydown);
  window.removeEventListener("keyup", keyup);
  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", keydown);
  window.removeEventListener("keyup", keyup);
});
const mods = computed(() => {
  return [
    { on: state.mod1On, mod: state.mod1 },
    { on: state.mod2On, mod: state.mod2 },
    { on: state.mod3On, mod: state.mod3 },
    { on: state.mod4On, mod: state.mod4 },
  ];
});
</script>

<template>
  <div class="tulip">
    <div class="top-section">
      <div class="ridges">
        <div v-for=" in [0, 1, 2, 3, 4, 5, 6, 7, 8]" class="ridge">
          <div class="inner-ridge"></div>
        </div>
      </div>
      <div class="ridges">
        <div v-for=" in [0, 1, 2, 3, 4, 5, 6, 7, 8]" class="ridge">
          <div class="inner-ridge"></div>
        </div>
      </div>
    </div>
    <div class="panel-section">
      <div class="silkscreen-regular notes">
        {{ state.notes }}
      </div>
    </div>
    <div class="bottom-section">
      <div class="buttons">
        <div class="chord-buttons">
          <ChordCard
            v-for="i in [0, 1, 2, 3]"
            :on="state.chord?.name === Chords[i].name"
            :chord="Chords[i]"
            :key-binding="chordKeys[i]"
            @click.native="toggleChord(Chords[i])"
          />
        </div>
        <div class="mod-buttons">
          <ModCard
            v-for="(m, i) in mods"
            :on="m.on"
            :mod="m.mod"
            :key-binding="modKeys[i]"
            @click.native="toggleMod(i)"
          />
        </div>
      </div>
      <div class="keys">
        <Keyboard
          :root="state.root"
          :octave="state.octave"
          :keyboard-keys="keyboardKeys"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tulip {
  min-width: 1000px;
  filter: drop-shadow(30px 30px 40px black);
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 50px;
  margin-top: 25px;
  margin-bottom: 25px;
}
.chord-buttons,
.mod-buttons {
  display: inline-flex;
  gap: 4px;
}
.keys {
  width: 100%;
  margin-left: 140px;
}
.top-section {
  min-width: 1000px;
  max-width: 1000px;
  min-height: 100px;
  max-height: 100px;
  border: 1px solid white;
  border-bottom: 0;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  display: inline-flex;
  align-items: start;
  justify-items: center;
  gap: 200px;
  padding-top: 8px;
  background: rgb(150, 139, 105);
}
.ridges {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
}
.ridge {
  min-width: 10px;
  min-height: 48px;
  max-height: 48px;
  border: 1px solid white;
  border-radius: 20px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner-ridge {
  min-width: 3px;
  max-width: 5px;
  min-height: 40px;
  max-height: 40px;
  border: 1px solid black;
  border-radius: 20px;
  background: black;
  margin-left: 1px;
}
.panel-section {
  min-width: 1000px;
  min-height: 120px;
  border: 1px solid white;
  border-bottom: 0;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  position: relative;
  top: -40px;
  background: black;
  display: flex;
  align-items: center;
}
.notes {
  font-size: 50px;
  text-align: start;
  margin-left: 20px;
}
.bottom-section {
  display: inline-flex;
  min-width: 1000px;
  border: 1px solid white;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
  top: -40px;
  background: rgb(31, 31, 31);
}
</style>
