var hanzi = require("hanzi");
hanzi.start();

const fs = require("fs");

fs.readFile("set 2.txt", "utf-8", (err,data) => {
    if (err) throw err;
    var decomposition = hanzi.decomposeMany(data);
    console.log(decomposition);
});
