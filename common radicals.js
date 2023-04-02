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

var str_kangxi_radicals = fs.readFileSync("kangxi radicals.txt", "utf8");
for (let i in str_kangxi_radicals) {
    radicals_kangxi.push(str_kangxi_radicals[i]);
}
