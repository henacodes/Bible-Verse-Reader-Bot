import { Bot, session } from "grammy";
import dotenv from "dotenv";
import fs from "fs";
import {
  readVerse,
  initialState,
  OtBooksKeyboard,
  NtBooksKeyboard,
} from "./utils.js";
dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.use(session({ initial: initialState }));
bot.command("start", (ctx) => {
  ctx.reply(
    "Welcome to Bible verse reader. \n To find a specific verse please send /read"
  );
});

bot.command("read", (ctx) => {
  ctx.reply("Choose :", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Old Testament",
            callback_data: "ot",
          },
        ],
        [
          {
            text: "New Testament",
            callback_data: "nt",
          },
        ],
      ],
    },
  });
});

bot.callbackQuery("ot", (ctx) => {
  ctx.session.cat = "ot";

  ctx.reply("Choose from OT Books", {
    reply_markup: {
      inline_keyboard: OtBooksKeyboard,
    },
  });
});

bot.callbackQuery("nt", (ctx) => {
  ctx.session.cat = "nt";

  ctx.reply("Choose from NT Books", {
    reply_markup: {
      inline_keyboard: NtBooksKeyboard,
    },
  });
});

bot.callbackQuery("book", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(ctx.callbackQuery);
});

bot.on("callback_query", (ctx) => {
  const book = ctx.callbackQuery.data.split(" ")[1];
  ctx.session.book = book;
  ctx.reply(`Okay. what chapter do you wanna open from the book of ${book} `);
});

bot.on("message:text", (ctx) => {
  const text = ctx.message.text;
  const { book, chapter } = ctx.session;
  const hasLetters = /[a-zA-Z]/.test(text);
  if (book) {
    if (hasLetters) {
      ctx.reply("Send only numbers with no letter");
    } else {
      if (chapter) {
        readVerse(ctx, book, chapter, parseInt(text));
      } else {
        ctx.session.chapter = parseInt(text);
        ctx.reply(
          `Now, give me the verse your wanna find from ${book} ${text} `
        );
      }
    }
  } else {
    ctx.reply(
      "Why did you send a text?. \n send /read if you wanna find a bible verse"
    );
  }
});

bot.start();
/* 
fs.readFile(`./data/1john.json`, "utf8", (err, data) => {
  if (err) {
    return ctx.reply(err.message);
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);
  console.log(jsonData);
});
 */
