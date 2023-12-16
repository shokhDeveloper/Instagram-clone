export const getItem = (key: string) => window.localStorage.getItem(key)
export const setItem = (key: string, value: object | string ) => window.localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value): value)
export const removeItem = (key: string) => window.localStorage.removeItem(key)
export let wordsArray = ["npm cache",
"vue",
"hacking world",
"end",
"I",
"all",
"number",
"oil",
"within",
"now",
"right",
"feet",
"leave",
"what",
"now",
"facebook",
"came",
"live",
"test",
"about",
"netflix",
"came",
"set",
"were",
"follow",
"study",
"day",
"structure",
"over",
"why",
"why",
"talk",
"soon",
"because",
"random",
"watch",
"year",
"her",
"any",
"snapchat",
"I",
"both",
"around",
"book",
"line",
"mother",
"open",
"now",
"defend",
"mile",
"go",
"by",
"found",
"said",
"eye",
"come",
"so",
"place",
"food",
"got",
"city",
"always",
"these",
"any",
"use",
"been",
"was",
"read",
"their",
"without",
"as",
"change",
"leave",
"can",
"they",
"those",
"eat",
"never",
"no",
"eat",
"story"]