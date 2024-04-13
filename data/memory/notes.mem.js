const fs = require("fs");
const crypto = require("crypto");

class NotesManager {
  constructor() {
    this.notes = []
  }
  async create(data) {
    try {
      if (!data.text) {
        throw new Error("Enter text!");
      } else {
        const note = {
          id: crypto.randomBytes(12).toString("hex"),
          text: data.text,
          category: data.category || "to do",
          date: new Date(),
        };
        this.notes.push(note);
        return note;
      }
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      return this.notes;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let note = this.notes.find((each) => each.id === id);
      return note;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      let note = this.notes.find((each) => each.id === id);
      if (note) {
        for (let prop in data) {
          note[prop] = data[prop];
        }
      }
      return note;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      let note = this.notes.find((each) => each.id === id);
      if (note) {
        this.notes = this.notes.filter((each) => each.id !== id);
      }
      return note;
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  try {
    const notes = new NotesManager();
    await notes.create({ text: "my first note", category: "done" });
    await notes.create({ text: "my 2nd note" });
    await notes.create({ text: "my 3rd note" });
    await notes.create({ text: "my 4th note" });
    await notes.create({ text: "my 5th note", category: "done" });
    await notes.create({ text: "my 6th note", category: "done" });
    await notes.create({ text: "my 7th note", category: "done" });
    await notes.create({ text: "my 8th note" });
    await notes.create({ text: "my 9th note" });
    const last = await notes.create({ text: "my last note" });
    await notes.read();
    await notes.readOne(last.id);
    await notes.update(last.id, { category: "done" });
    await notes.destroy(last.id);
  } catch (error) {
    console.log(error);
  }
}
//test();
