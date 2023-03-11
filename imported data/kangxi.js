const fs = require("fs");

fs.readFile("imported data/kangxi radicals.txt", "utf-8", (err,data) => {
    if (err) throw err;
    data = data.replace(/,/g, "");   //remove ","
    console.log(data);
    console.log(typeof data);
});