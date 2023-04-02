const fs = require("fs");

var hanzi = require("hanzi");
hanzi.lib_radicals = require("hanzi/lib/data/radicalList.js")["radicalList"];
hanzi.lib_radicals_with_meaning = require("hanzi/lib/data/radicalListWithMeaning.js")["radicalListWithMeaning"];


radicals_lib = hanzi.lib_radicals;
radicals_lib_w_meaning = [];
radicals_kangxi = [];

for (let i in hanzi.lib_radicals_with_meaning) {
    radicals_lib_w_meaning.push(i);
}

/*
fs.readFile("kangxi radicals.txt", "utf-8", (err,data) => {
    if (err) throw err;
    for (var i in data) {
        radicals_kangxi.push(data[i]);
        console.log(data[i]);
    }
    console.log(radicals_kangxi);
});
*/

var text = fs.readFileSync("kangxi radicals.txt", "utf8");
console.log(text);