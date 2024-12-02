export interface Note {
  name: string;
  alt?: string;
  value: number;
  octave?: number;
}

export function AddNote(note: Note, mod: number): Note {
  let val = note.value - 1 + mod;
  const res = Notes[val % 12];
  res.octave = note.octave;
  if (res.octave) {
    while (val < 0) {
      res.octave--;
      val += 12;
    }
    while (val > 11) {
      res.octave++;
      val -= 12;
    }
  }
  return res;
}

export function Equals(a: Note | null, b: Note | null): boolean {
  return a != null && b != null && a.value === b.value && a.octave === b.octave;
}

export function NoteToString(note: Note): string {
  return `${note.name}${note.octave}`;
}

const Notes: Note[] = [
  { name: "C", value: 1 },
  { name: "C#", alt: "Db", value: 2 },
  { name: "D", value: 3 },
  { name: "D#", alt: "Eb", value: 4 },
  { name: "E", value: 5 },
  { name: "F", value: 6 },
  { name: "F#", alt: "Gb", value: 7 },
  { name: "G", value: 8 },
  { name: "G#", alt: "Ab", value: 9 },
  { name: "A", value: 10 },
  { name: "A#", alt: "Bb", value: 11 },
  { name: "B", value: 12 },
];
export default Notes;
