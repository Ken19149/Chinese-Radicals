const OpenCC = require('opencc-js');
var stroke = require('chinese-stroke');
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

//------------------------------Functions-----------------------------------//
// modify code from common radicals.js

// return as string
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

// find common elements function
function returnCommon(set1, set2, returnArray=true) {
    let set_common = [];    //array

    for (i in set1) {
        for (j in set2) {
            if (set1[i] == set2[j]) {
                set_common = set_common.concat(set1[i]);
            }
        }
    }

    set_common = removeDupe(set_common, true, true);    // turned into string
    array_set_common = [];

    if (returnArray = true) {
        for (let i in set_common) {
            array_set_common = array_set_common.concat(set_common[i]);
        }
        return array_set_common;        // return as array
    } else if (returnArray = false) {
        return set_common;              // return as string
    }
}

//----------------------------show data---------------------------
//show all the components for each sets
for (let i in sets_decomposition) {
    console.log(sets_decomposition[i][1]);
}
//print the length of string in each array
for (let i in sets_decomposition) {
    let n = parseInt(i)+1;
    console.log((n * interval_length) + ": " + sets_decomposition[i][0].length + " | " + sets_decomposition[i][1].length + " | " + sets_decomposition[i][2].length);
}

//---------------------radical stuffs-------------------------------
// create array for kangxi radicals

var kangxi_file = fs.readFileSync("kangxi radicals match variants.txt", "utf8");
var radicals = kangxi_file.split("\n");
for (i in radicals) {
    radicals[i] = radicals[i].replace(/\r/g, "");
    radicals[i] = radicals[i].split(" ");
}
//console.log(radicals);

// create array sets with components
sets_w_components = [];
for (let i in sets) {
    sets_w_components = sets_w_components.concat([[]]);
    for (let j in sets[i]) {
        sets_w_components[i] = sets_w_components[i].concat([[[sets[i][j]],[]]]);
        sets_w_components[i][j][1] = sets_w_components[i][j][1].concat(hanzi.decompose(sets_w_components[i][j][0].toString())["components2"]);  // add components
        sets_w_components[i][j][1] = returnCommon(kangxi_file, sets_w_components[i][j][1], true);
        sets_w_components[i][j][0] = sets_w_components[i][j][0].concat(stroke.get(sets_w_components[i][j][0]));     // add stroke counts
    }
}

console.log(require('util').inspect(sets_w_components, false, null, true));
//console.dir(sets_w_components, {'maxArrayLength': 10})
//console.log(sets_w_components);
