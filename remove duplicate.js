const { Console } = require("console");
const fs = require("fs");

var kangxi_radicals = fs.readFileSync("kangxi radicals.txt", "utf-8");
kangxi_radicals = kangxi_radicals.replace(/\n/g, "").replace(/" "/g, "");     //remove new lines and spaces
let str = "";

for (let i in kangxi_radicals) {
    if (kangxi_radicals != "") {
        str = str.concat(kangxi_radicals[0]);
        kangxi_radicals = kangxi_radicals.split(kangxi_radicals[0]).join("");    //replace first character with ""; remove 1st character
    } else if (kangxi_radicals == "") {
        break;
    }
}
console.log(str);