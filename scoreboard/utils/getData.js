import records from "../data/records.json";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function slugifyKeysOfArray(array = []) {
  return array.map((info) => {
    let obj = {};

    let keys = Object.keys(info);

    keys.forEach((key) => {
      obj[slugify(key)] = info[key];
    });
    return obj;
  });
}

export function getData(params) {
  console.log(slugifyKeysOfArray(records));
}
