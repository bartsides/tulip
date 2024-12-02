import * as Tone from "tone";
import { Chord } from "./theory/Chords";
import Mods, { Mod } from "./theory/Mods";
import { Equals, Note, NoteToString } from "./theory/Notes";

export class SynthEngine {
  synth: Tone.PolySynth | null = null;
  root: Note | null = null;
  chord: Chord | null = null;
  mod1: Mod = Mods[0];
  mod2: Mod = Mods[1];
  mod3: Mod = Mods[2];
  mod4: Mod = Mods[3];
  mod1On = false;
  mod2On = false;
  mod3On = false;
  mod4On = false;
  notes: Note[] = [];
  octave = 3;

  setupSynth() {
    this.synth = new Tone.PolySynth(Tone.MonoSynth, {
      volume: -12,
      oscillator: {
        type: "square8",
      },
      envelope: {
        attack: 0.05,
        decay: 0.3,
        sustain: 0.4,
        release: 0.8,
      },
      filterEnvelope: {
        attack: 0.001,
        decay: 0.7,
        sustain: 0.1,
        release: 0.8,
        baseFrequency: 300,
        octaves: 4,
      },
    }).toDestination();
  }

  private playNote(note: Note) {
    this.synth!.triggerAttack(NoteToString(note));
  }

  play() {
    if (!this.synth) this.setupSynth();
    this.release();
    if (!this.root) return;

    this.notes = [this.root];
    if (this.chord) this.notes.push(...this.chord.getNotes(this.root));
    if (this.mod1On) this.notes.push(this.mod1.getNote(this.root!));
    if (this.mod2On) this.notes.push(this.mod2.getNote(this.root!));
    if (this.mod3On) this.notes.push(this.mod3.getNote(this.root!));
    if (this.mod4On) this.notes.push(this.mod4.getNote(this.root!));

    console.log(this.notes.map(NoteToString).join(" "));
    this.synth!.volume.value = -12 - 1 * (this.notes.length - 1);
    this.notes.forEach((n) => this.playNote(n));
  }

  release() {
    this.synth?.releaseAll();
    this.notes = [];
  }

  changeRootNote(note: Note | null): Note | null {
    if (note && !note.octave) note.octave = this.octave;
    if (Equals(this.root, note)) return this.root;
    this.root = JSON.parse(JSON.stringify(note));
    this.play();
    return this.root;
  }

  changeChord(c: Chord | null): Chord | null {
    if (this.chord?.name == c?.name) return this.chord;
    this.chord = c;
    this.play();
    return this.chord;
  }

  toggleChord(c: Chord): Chord | null {
    if (this.chord?.name == c?.name) {
      return this.changeChord(null);
    } else {
      return this.changeChord(c);
    }
  }

  addMod(num: number) {
    if (num === 0 && !this.mod1On) {
      this.mod1On = true;
      this.play();
    } else if (num === 1 && !this.mod2On) {
      this.mod2On = true;
      this.play();
    } else if (num === 2 && !this.mod3On) {
      this.mod3On = true;
      this.play();
    } else if (num === 3 && !this.mod4On) {
      this.mod4On = true;
      this.play();
    }
  }

  removeMod(num: number) {
    if (num === 0 && this.mod1On) {
      this.mod1On = false;
      this.play();
    } else if (num === 1 && this.mod2On) {
      this.mod2On = false;
      this.play();
    } else if (num === 2 && this.mod3On) {
      this.mod3On = false;
      this.play();
    } else if (num === 3 && this.mod4On) {
      this.mod4On = false;
      this.play();
    }
  }

  changeOctave(value: number) {
    this.octave = value;
  }

  getNotes(): string {
    return this.notes.map(NoteToString).join(" ");
  }
}
