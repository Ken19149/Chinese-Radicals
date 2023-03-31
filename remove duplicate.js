const { Console } = require("console");
const fs = require("fs");

fs.readFile("kangxi radicals.txt", "utf-8", (err,data) => {
    if (err) throw err;
    data = data.replace(/\n/g, "").replace(/" "/g, "");     //remove new lines and spaces
    let str = "";

    for (let i in data) {
        if (data != "") {
            str = str.concat(data[0]);
            data = data.split(data[0]).join("");    //replace first character with ""; remove 1st character
        } else if (data == "") {
            console.log("empty");
            break;
        }
    }
    console.log(str);
});