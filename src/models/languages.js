const db = require("./../../data/db");

module.exports = {
  async get() {
    let data = await db.select("id", "name", "enabled").from("languages");
    return data;
  },

  update(data) {
      data.forEach(async (language) => {
        await db("languages")
          .where({ id: language.id })
          .update({ enabled: language.enabled });
      });
  },
};
