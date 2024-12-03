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
  maxVolume = -6;
  volumeBoost = 0;
  voice = 1;
  trem: Tone.Tremolo | null = null;
  reverb: Tone.Reverb | null = null;
  delay: Tone.FeedbackDelay | null = null;

  constructor(octave: number, voice: number) {
    this.octave = octave;
    this.voice = voice;
  }

  setupSynth() {
    this.synth?.dispose();
    this.trem?.dispose();
    this.reverb?.dispose();
    this.delay?.dispose();
    this.synth = this.getSynth(this.voice);
  }

  getSynth(num: number): Tone.PolySynth {
    this.volumeBoost = 0;
    if (num === 1) {
      return new Tone.PolySynth(Tone.MonoSynth, {
        volume: this.getVolume(),
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
    if (num === 2) {
      this.delay = new Tone.FeedbackDelay("8n", 0.75).toDestination();
      return new Tone.PolySynth(Tone.FMSynth, {
        volume: this.getVolume(),
        harmonicity: 3,
        oscillator: {
          phase: 0,
          type: "sine",
        },
        envelope: {
          attack: 0.01,
          attackCurve: "linear",
          decay: 0.2,
          decayCurve: "exponential",
          release: 0.5,
          releaseCurve: "exponential",
          sustain: 1,
        },
        modulation: {
          partialCount: 0,
          phase: 0,
          type: "square",
        },
        modulationEnvelope: {
          attack: 0.2,
          attackCurve: "linear",
          decay: 0.01,
          decayCurve: "exponential",
          release: 0.5,
          releaseCurve: "exponential",
          sustain: 1,
        },
        modulationIndex: 12.22,
      }).connect(this.delay);
    }
    if (num === 3) {
      this.volumeBoost = 10;
      this.reverb = new Tone.Reverb({
        wet: 1,
        decay: 3.5,
        preDelay: 0.01,
      }).toDestination();
      return new Tone.PolySynth(Tone.AMSynth, {
        volume: this.getVolume(),
        harmonicity: 2.5,
        oscillator: {
          phase: 0,
          type: "fatsawtooth",
          count: 3,
          spread: 20,
        },
        envelope: {
          attack: 0.1,
          attackCurve: "linear",
          decay: 0.2,
          decayCurve: "exponential",
          release: 0.3,
          releaseCurve: "exponential",
          sustain: 0.2,
        },
        modulation: {
          partialCount: 0,
          phase: 0,
          type: "square",
        },
        modulationEnvelope: {
          attack: 0.5,
          attackCurve: "linear",
          decay: 0.01,
          decayCurve: "exponential",
          release: 0.5,
          releaseCurve: "exponential",
          sustain: 1,
        },
      }).connect(this.reverb);
    }
    throw new Error(`Unknown synth voice ${num}`);
  }

  private playNote(note: Note) {
    this.synth!.triggerAttack(NoteToString(note));
  }

  private getVolume(): number {
    return this.maxVolume - 1 * (this.notes.length - 1) + this.volumeBoost;
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

    this.synth!.volume.value = this.getVolume();
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

  changeOctave(value: number): number {
    this.octave = value;
    if (this.root) this.root.octave = this.octave;
    this.play();
    return this.octave;
  }

  changeVoice(value: number): number {
    this.voice = value;
    this.setupSynth();
    this.play();
    return this.voice;
  }

  getNotes(): string {
    return this.notes.map(NoteToString).join(" ");
  }
}
