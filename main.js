const OpenCC = require('opencc-js');
var hanzi = require("hanzi");
hanzi.start();

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });   //change simplified to taiwan traditional chinese

const fs = require("fs");   //filesystem to open file

var set_simplified = fs.readFileSync("set-simplified.txt", "utf8")
var traditional = converter(set_simplified);         //convert simplified -> traditional
var decomposition = hanzi.decomposeMany(traditional);      //breakdown characters
console.log(decomposition);