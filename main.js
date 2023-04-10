const OpenCC = require('opencc-js');
var hanzi = require("hanzi");
hanzi.start();

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });   //change simplified to taiwan traditional chinese

const fs = require("fs");   //filesystem to open file
const { type } = require('os');

var set_simplified = fs.readFileSync("set-simplified.txt", "utf8")
var traditional = converter(set_simplified);         //convert simplified -> traditional

//create sets of 1k - 5k characters
interval_length = 1000
sets_count = 5
sets = createSets(traditional, sets_count, interval_length);    //input_set = really long string; 

function createSets(input_set, sets_count = 5, interval_length = 1000){
    var sets = []

    for (let i = 0; i < sets_count; i++) {
        sets.push([]);
        if (i > 0) {
            sets[i] = sets[i-1].concat(sets[i]);
        }
        for (let j = 0; j < interval_length;j++){
            sets[i].push(input_set[i*interval_length+j]);
        }
    }
    return sets
}

//return data of the set
function setData(sets){
    sets_count = sets.length;
    interval_length = sets[0].length;
    full_str = "";
    str = "";
    for (let i = 0; i < sets_count; i++) {
        str = str.concat((((i+1)*interval_length)-1) + ": " + sets[i][((i+1)*interval_length)-2] + " " +  ((i+1)*interval_length) + ": " + sets[i][((i+1)*interval_length)-1] + " ");
    }
    full_str = full_str.concat("length: " + sets[sets_count-1].length, " first: " + sets[sets_count-1][0], " last: " + sets[sets_count-1][sets_count-1] + " " + str);
    return full_str;
}

sets_decomposition = [];

for (let i = 0; i < sets_count; i++) {
    sets_decomposition = sets_decomposition.concat([[[],[],[]]]);
}

//decompose and remove dupes for all characters in the array

for (i in sets) {
    for (j in sets[i]) {
        let decom = hanzi.decompose(sets[i][j]);
        sets_decomposition[i][0] = sets_decomposition[i][0].concat(decom["components1"]);
        sets_decomposition[i][1] = sets_decomposition[i][1].concat(decom["components2"]);
        sets_decomposition[i][2] = sets_decomposition[i][2].concat(decom["components3"]);
    }

    sets_decomposition[i][0] = removeDupe(sets_decomposition[i][0], true, true);
    sets_decomposition[i][1] = removeDupe(sets_decomposition[i][1], true, true);
    sets_decomposition[i][2] = removeDupe(sets_decomposition[i][2], true, true);
}

//create remove dupe in array function      --reuse code from common radicals.js

function removeDupe(array, removeAlphabet = false, removeNumber = false, removeSyntax = false) {
    let str_array = "";
    let str_array_remove_dupe = "";
    for (let i in array) {
        str_array = str_array.concat(array[i]);
    }
    
    for (let i in str_array) {
        if (str_array != "") {
            str_array_remove_dupe = str_array_remove_dupe.concat(str_array[0]);
            str_array = str_array.split(str_array[0]).join("");    //replace first character with ""; remove 1st character
        } else if (str_array == "") {
            break;
        }
    }

    if (removeAlphabet == true) {
        str_array_remove_dupe = str_array_remove_dupe.replace(/[A-z]/g, "");
    }
    if (removeNumber == true) {
        str_array_remove_dupe = str_array_remove_dupe.replace(/[0-9]/g, "");
    }

    return str_array_remove_dupe;
}

//print the length of string in each array
console.log(sets_decomposition);
for (let i in sets_decomposition) {
    let n = parseInt(i)+1;
    console.log((n * interval_length) + ": " + sets_decomposition[i][0].length + " | " + sets_decomposition[i][1].length + " | " + sets_decomposition[i][2].length);
}
