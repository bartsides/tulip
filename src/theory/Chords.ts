import { AddNote, Note } from "./Notes";

export interface Chord {
  name: string;
  getNotes: (root: Note) => Note[];
}

const Chords: Chord[] = [
  {
    name: "Dim",
    getNotes(root) {
      return [AddNote(root, 3), AddNote(root, 6)];
    },
  },
  {
    name: "Min",
    getNotes(root) {
      return [AddNote(root, 3), AddNote(root, 7)];
    },
  },
  {
    name: "Maj",
    getNotes(root) {
      return [AddNote(root, 4), AddNote(root, 7)];
    },
  },
  {
    name: "Sus",
    getNotes(root) {
      return [AddNote(root, 5), AddNote(root, 7)];
    },
  },
];

export default Chords;
