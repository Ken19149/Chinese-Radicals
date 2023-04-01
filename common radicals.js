var hanzi = require("hanzi");
hanzi.lib_radicals = require("hanzi/lib/data/radicalList.js")["radicalList"];
hanzi.lib_radicals_with_meaning = require("hanzi/lib/data/radicalListWithMeaning.js")["radicalListWithMeaning"];
for (let i in hanzi.lib_radicals_with_meaning) {
    console.log(i + ": " + hanzi.lib_radicals_with_meaning[i]);
}