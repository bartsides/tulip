export interface Note {
  name: string;
  alt?: string;
  value: number;
  octave?: number;
}

export function AddNote(note: Note, mod: number): Note {
  // TODO: Handle going over and under bounds of array
  const res = Notes[(note.value - 1 + mod) % 12];
  res.octave = note.octave;
  //console.log(res.name, res.octave);
  return res;
}

export function Equals(a: Note | null, b: Note | null): boolean {
  return a != null && b != null && a.value === b.value && a.octave === b.octave;
}

export function NoteToString(note: Note): string {
  return `${note.name}${note.octave}`;
}

const Notes: Note[] = [
  { name: "A", value: 1 },
  { name: "A#", alt: "Bb", value: 2 },
  { name: "B", value: 3 },
  { name: "C", value: 4 },
  { name: "C#", alt: "Db", value: 5 },
  { name: "D", value: 6 },
  { name: "D#", alt: "Eb", value: 7 },
  { name: "E", value: 8 },
  { name: "F", value: 9 },
  { name: "F#", alt: "Gb", value: 10 },
  { name: "G", value: 11 },
  { name: "G#", alt: "Ab", value: 12 },
];
export default Notes;
