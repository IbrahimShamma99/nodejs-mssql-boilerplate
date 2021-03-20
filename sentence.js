const sentences = require("./sentencing.json");
const fs = require("fs");

sentences.map((sentence, i) => {
  sentence["name"] = sentence["اسم"];
});

sentences.map((sentence, i) => {
  sentence["name"] = sentence["اسم"];
  var subSentence = sentences.filter((a, index) => index !== i);
  subSentence.map((b, subi) => {
    sentence["name".concat(subi)] = b["name"];
  });
});

const lessonsWithSEO_Array = sentences.map(a => {
    return {
        ...a,
        "اسم":undefined
    }
});
const lessonsWithSEO_ArrayContent = JSON.stringify(lessonsWithSEO_Array);
fs.writeFile(
  "./tomorrows.json",
  lessonsWithSEO_ArrayContent,
  "utf8",
  (err) => {}
);
