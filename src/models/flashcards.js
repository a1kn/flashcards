const db = require("./../../data/db");

module.exports = {
  async get() {
    let data = await db
      .select(
        "flashcards_languages.id as id",
        "flashcards.id as flashcard_id",
        "flashcards.title",
        "flashcards_languages.title as local_title",
        "flashcards_languages.content",
        "flashcards_languages.languages_id as language_id"
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

    data = Object.keys(cards).map((flashcard_id) => {
      const main = cards[flashcard_id].find((card) => card.language_id === 1);
      const variants = cards[flashcard_id].filter(
        (card) => card.language_id !== 1
      );

      return {
        id: flashcard_id,
        title: main.title,
        content: main.content,
        locals: variants.map((variant) => {
          return {
            title: variant.local_title,
            languageId: variant.language_id,
            content: variant.content,
          };
        }),
      };
    });

    return data;
  },

  create({ title, content, locals }) {
    return new Promise((resolve, reject) => {
      return db("flashcards")
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
              locals.forEach((local) => {
                db("flashcards_languages")
                  .insert({
                    title: local.title,
                    content: local.content,
                    languages_id: local.languageId,
                    flashcards_id: cardId[0],
                  })
                  .then(() => resolve(cardId[0]));
              });
            });
        });
    });
  },

  update({ id, title, content, locals }) {
    return new Promise((resolve, reject) => {
      return db("flashcards")
        .where({ id })
        .update({ title })
        .then(() => {
          db("flashcards_languages")
            .where({ flashcards_id: id, languages_id: 1 })
            .update({
              title,
              content,
            })
            .then(() => {
              locals.forEach(async (local) => {
                const rows = await db("flashcards_languages")
                  .select()
                  .where({ flashcards_id: id, languages_id: local.languageId });

                if (rows.length === 0) {
                  await db("flashcards_languages").insert({
                    title: local.title,
                    content: local.content,
                    languages_id: local.languageId,
                    flashcards_id: id,
                  });
                } else {
                  await db("flashcards_languages")
                    .where({ id: rows[0].id })
                    .update({
                      title: local.title,
                      content: local.content,
                    });
                }
              });
              resolve();
            });
        });
    });
  },
};
