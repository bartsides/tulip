import { AddNote, Note } from "./notes";

export interface Mod {
  name: string;
  getNote: (root: Note) => Note;
}

const Mods: Mod[] = [
  {
    name: "6",
    getNote(root) {
      return AddNote(root, 9);
    },
  },
  {
    name: "m7",
    getNote(root) {
      return AddNote(root, 10);
    },
  },
  {
    name: "M7",
    getNote(root) {
      return AddNote(root, 11);
    },
  },
  {
    name: "9",
    getNote(root) {
      return AddNote(root, 13);
    },
  },
];

export default Mods;
