const fs = require("fs");
const crypto = require("crypto");

class NotesManager {
  constructor() {
    this.path = "./files/notes.json";
    this.init();
  }
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const stringData = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, stringData);
        console.log("file created!");
      } else {
        console.log("fs connected!");
      }
    } catch (error) {
      throw error;
    }
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
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(note);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return note;
      }
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let note = all.find((each) => each.id === id);
      return note;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let note = all.find((each) => each.id === id);
      if (note) {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
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
