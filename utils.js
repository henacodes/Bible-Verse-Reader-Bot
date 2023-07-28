const fs = require("fs");

const readVerse = (ctx, book, chapter, verse) => {
  // Read the JSON file
  fs.readFile(`./data/${book}.json`, "utf8", (err, data) => {
    if (err) {
      return ctx.reply(err.message);
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    const scriptureVerse =
      jsonData.chapters[parseInt(chapter) - 1].verses[parseInt(verse) - 1].text;
    return ctx.reply(scriptureVerse);
  });
};
