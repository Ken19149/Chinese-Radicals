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

//remove duplicates from combined radicals in library

var radicals_combine_lib_total = radicals_lib.concat(radicals_lib_w_meaning);

for (let i in radicals_combine_lib_total) {
    if (radicals_combine_lib_total != []) {
        radicals_combine_lib = radicals_combine_lib.concat(radicals_combine_lib_total[0]);
        
    } else if (radicals_combine_lib_total == []) {
        break;
    }
}

console.log("kangxi radicals: " + radicals_kangxi.length);
console.log("radicals lib: " + radicals_lib.length);
console.log("radicals lib with meaning:" + radicals_lib_w_meaning.length);
console.log("combine total: " + radicals_combine_lib_total.length);
console.log("combine remove dupe: " + radicals_combine_lib.length);