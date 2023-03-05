const fs = require("fs");
var txt = fs.readFile("set.txt", "utf-8", (err,data) => {
    if (err) {
        console.error(err);
        return;
      }
      console.log(data);
});