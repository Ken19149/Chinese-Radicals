const fs = require("fs");

fs.readFile("set.txt", "utf-8", (err,data) => {
    if (err) throw err;
    data = data.replace(/\n/g, "");
    console.log(data);
    console.log(typeof data);
});

