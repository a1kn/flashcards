const flashcardsModel = require("../../models/flashcards");

module.exports = (app) => {
  app.post("/api/flashcards", async (req, res) => {
    const data = req.body;
    const addToDb = await flashcardsModel.create(data);

    return res.json({id: addToDb}).status(200);
  });
};
