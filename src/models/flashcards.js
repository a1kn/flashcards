const db = require("./../../data/db");

module.exports = {
  async get() {
    let data = await db
      .select(
        "flashcards_languages.id as id",
        "flashcards.id as flashcard_id",
        "flashcards.title",
        "flashcards_languages.title as local_title",
        "flashcards_languages.content"
      )
      .from("flashcards")
      .join(
        "flashcards_languages",
        "flashcards.id",
        "=",
        "flashcards_languages.flashcards_id"
      );

    const cards = {};

    for (let i = 0; i < data.length; i++) {
      if (cards[data[i].flashcard_id]) {
        cards[data[i].flashcard_id].push(data[i]);
      } else {
        cards[data[i].flashcard_id] = [data[i]];
      }
    }

    return Object.keys(cards).map((flashcard_id) => {
      const variants = cards[flashcard_id];
      return {
        id: flashcard_id,
        title: variants[0].title,
        locals: variants.slice(1).map((variant) => {
          return {
            title: variant.local_title,
            languageId: variant.id,
            content: variant.content,
          };
        }),
      };
    });
  },

  async create(title, content, locals) {
    db("flashcards")
      .returning("id")
      .insert({ title })
      .then((cardId) => {
        db("flashcards_languages")
          .insert({
            languages_id: 1,
            flashcards_id: cardId[0],
            title,
            content,
          })
          .then(() => {
            if (locals) {
              locals.forEach((local) => {
                db("flashcards_languages")
                  .insert({
                    title: local.title,
                    languages_id: local.languageId,
                    flashcards_id: cardId[0],
                    content: local.content,
                  })
                  .then(() => cardId[0]);
              });
            }
          });
      });
  },
};
