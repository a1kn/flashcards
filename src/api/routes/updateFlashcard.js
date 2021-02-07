const flashcardsModel = require("../../models/flashcards");

module.exports = (app) => {
  app.post("/api/flashcards/update", async (req, res) => {
    const data = req.body;
    await flashcardsModel.update(data);
    return res.json().status(200);
  });
};
