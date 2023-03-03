var hanzi = require("hanzi");
hanzi.start();

var decomposition = hanzi.decompose("梦", 2);
console.log(decomposition);