const yargs = require("yargs");
const { addNote, printNotes, deleteNote } = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes();    
  },
});
yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      type: "string",
      describe: "ID title",
      demandOption: true,
    },
  },
  async handler({id}) {
    deleteNote(id);
  },
});

yargs.parse();
