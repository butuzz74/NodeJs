const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function printNotes() {
    const notes = await getNotes();
    console.log("Here is the list of notes:")
    notes.forEach(note => console.log(note.id, note.title))    
}
async function deleteNote(id) {
    const notes = await getNotes();
    const newNotes = notes.mapfilter(el => el.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(newNotes));
}
async function editNote(id, title) {
  const notes = await getNotes();
  const editNotes = notes.map(el => {
    if(el.id === id){
      el.title = title;
      return el
    } else {
      return el
    }
  })
  await fs.writeFile(notesPath, JSON.stringify(editNotes));
}

module.exports = {
  addNote,
  printNotes,
  deleteNote,
  editNote
};
