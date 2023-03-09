const OpenCC = require('opencc-js');
var hanzi = require("hanzi");
hanzi.start();

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });   //change simplified to taiwan traditional chinese

const fs = require("fs");   //filesystem to open file

fs.readFile("set-simplified.txt", "utf-8", (err,data) => {
    if (err) throw err;
    var traditional = converter(data);         //convert simplified -> traditional
    var decomposition = hanzi.decomposeMany(traditional);      //breakdown characters
    console.log(decomposition);
});
