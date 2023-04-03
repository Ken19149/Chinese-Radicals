const fs = require("fs");

var hanzi = require("hanzi");
hanzi.lib_radicals = require("hanzi/lib/data/radicalList.js")["radicalList"];
hanzi.lib_radicals_with_meaning = require("hanzi/lib/data/radicalListWithMeaning.js")["radicalListWithMeaning"];


var radicals_lib = hanzi.lib_radicals;
var radicals_lib_w_meaning = [];
var radicals_kangxi = [];
var radicals_combine_lib = [];

for (let i in hanzi.lib_radicals_with_meaning) {
    radicals_lib_w_meaning.push(i);
}

var str_kangxi_radicals = fs.readFileSync("kangxi radicals.txt", "utf8");
for (let i in str_kangxi_radicals) {
    radicals_kangxi.push(str_kangxi_radicals[i]);
}

radicals_combine_lib = radicals_lib.concat(radicals_lib_w_meaning);
console.log(radicals_combine_lib);