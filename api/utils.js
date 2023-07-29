import fs from "fs";
import path from "path";
export const initialState = () => {
  return {
    cat: null,
    book: null,
    chapter: null,
    verse: null,
    state: null,
  };
};

export const commands = [
  { command: "start", description: "Start the bot" },
  { command: "read", description: "read bible verse" },
  { command: "help", description: "Get help with the bot" },
  { command: "about", description: "Info about the bot" },
];

export const readVerse = (ctx, book, chapter, verse) => {
  // Read the JSON file
  const filePath = path.join(__dirname, "data", `${book}.json`);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return ctx.reply(err.message);
    }
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    if (
      chapter > jsonData.chapters ||
      verse > jsonData.chapters[chapter - 1].verses.length
    ) {
      return ctx.reply(
        "the chapter or the verse you just gave is not available.\n Check if you gave the right chapter \n Send /read to try again"
      );
    }
    const scriptureVerse =
      jsonData.chapters[chapter - 1].verses[verse - 1].text;
    return ctx.reply(
      ` <b>${book.toUpperCase()}   ${chapter}:${verse} </b> \n\n\n${scriptureVerse}\n\n\n\n\n read the bible inside telegram @bible_verse_reader_bot`,
      {
        parse_mode: "HTML",
      }
    );
  });
};

export const NtBooksKeyboard = [
  [{ text: "Matthew", callback_data: "book matthew" }],
  [{ text: "Mark", callback_data: "book mark" }],
  [{ text: "Luke", callback_data: "book luke" }],
  [{ text: "John", callback_data: "book john" }],
  [{ text: "Acts", callback_data: "book acts" }],
  [{ text: "Romans", callback_data: "book romans" }],
  [{ text: "1st Corinthians", callback_data: "book 1corinthians" }],
  [{ text: "2nd Corinthians", callback_data: "book 2corinthians" }],
  [{ text: "Galatians", callback_data: "book galatians" }],
  [{ text: "Ephesians", callback_data: "book ephesians" }],
  [{ text: "Philippians", callback_data: "book philippians" }],
  [{ text: "Colossians", callback_data: "book colossians" }],
  [{ text: "1st Thessalonians", callback_data: "book 1thessalonians" }],
  [{ text: "2nd Thessalonians", callback_data: "book 2thessalonians" }],
  [{ text: "1st Timothy", callback_data: "book 1timothy" }],
  [{ text: "2nd Timothy", callback_data: "book 2timothy" }],
  [{ text: "Titus", callback_data: "book titus" }],
  [{ text: "Philemon", callback_data: "book philemon" }],
  [{ text: "Hebrews", callback_data: "book hebrews" }],
  [{ text: "James", callback_data: "book james" }],
  [{ text: "1st Peter", callback_data: "book 1peter" }],
  [{ text: "2nd Peter", callback_data: "book 2peter" }],
  [{ text: "1st John", callback_data: "book 1john" }],
  [{ text: "2nd John", callback_data: "book 2john" }],
  [{ text: "3rd John", callback_data: "book 3john" }],
  [{ text: "Jude", callback_data: "book jude" }],
  [{ text: "Revelation", callback_data: "book revelation" }],
];

export const OtBooksKeyboard = [
  [{ text: "Genesis", callback_data: "book genesis" }],
  [{ text: "Exodus", callback_data: "book exodus" }],
  [{ text: "Leviticus", callback_data: "book leviticus" }],
  [{ text: "Numbers", callback_data: "book numbers" }],
  [{ text: "Deuteronomy", callback_data: "book deuteronomy" }],
  [{ text: "Joshua", callback_data: "book joshua" }],
  [{ text: "Judges", callback_data: "book judges" }],
  [{ text: "Ruth", callback_data: "book ruth" }],
  [{ text: "1st Samuel", callback_data: "book 1samuel" }],
  [{ text: "2nd Samuel", callback_data: "book 2samuel" }],
  [{ text: "1st Kings", callback_data: "book 1kings" }],
  [{ text: "2nd Kings", callback_data: "book 2kings" }],
  [{ text: "1st Chronicles", callback_data: "book 1chronicles" }],
  [{ text: "2nd Chronicles", callback_data: "book 2chronicles" }],
  [{ text: "Ezra", callback_data: "book ezra" }],
  [{ text: "Nehemiah", callback_data: "book nehemiah" }],
  [{ text: "Esther", callback_data: "book esther" }],
  [{ text: "Job", callback_data: "book job" }],
  [{ text: "Psalms", callback_data: "book psalms" }],
  [{ text: "Proverbs", callback_data: "book proverbs" }],
  [{ text: "Ecclesiastes", callback_data: "book ecclesiastes" }],
  [{ text: "Song of Solomon", callback_data: "book songofsolomon" }],
  [{ text: "Isaiah", callback_data: "book isaiah" }],
  [{ text: "Jeremiah", callback_data: "book jeremiah" }],
  [{ text: "Lamentations", callback_data: "book lamentations" }],
  [{ text: "Ezekiel", callback_data: "book ezekiel" }],
  [{ text: "Daniel", callback_data: "book daniel" }],
  [{ text: "Hosea", callback_data: "book hosea" }],
  [{ text: "Joel", callback_data: "book joel" }],
  [{ text: "Amos", callback_data: "book amos" }],
  [{ text: "Obadiah", callback_data: "book obadiah" }],
  [{ text: "Jonah", callback_data: "book jonah" }],
  [{ text: "Micah", callback_data: "book micah" }],
  [{ text: "Nahum", callback_data: "book nahum" }],
  [{ text: "Habakkuk", callback_data: "book habakkuk" }],
  [{ text: "Zephaniah", callback_data: "book zephaniah" }],
  [{ text: "Haggai", callback_data: "book haggai" }],
  [{ text: "Zechariah", callback_data: "book zechariah" }],
  [{ text: "Malachi", callback_data: "book malachi" }],
];
