const db = require("./../../data/db");

module.exports = {
  async get() {
    let data = await db.select('id', 'name', 'enabled').from("languages");
    return data;
  },
};
