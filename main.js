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

    sets_decomposition[i][0] = removeDupe(sets_decomposition[i][0], true, true, true);
    sets_decomposition[i][1] = removeDupe(sets_decomposition[i][1], true, true, true);
    sets_decomposition[i][2] = removeDupe(sets_decomposition[i][2], true, true, true);
}

//------------------------------Functions-----------------------------------//
// modify code from common radicals.js

// return as string
function removeDupe(array, returnStr=true, removeAlphabet = false, removeNumber = false, removeSyntax = false) {
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
    if (returnStr == false) {
        let array_remove_dupe = [];
        for (let i in str_array_remove_dupe) {
            array_remove_dupe = array_remove_dupe.concat(str_array_remove_dupe[i]);
        }
        return array_remove_dupe;
    } else if (returnStr == true) {
        return str_array_remove_dupe;
    }
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

    set_common = removeDupe(set_common, true, true, true);    // turned into string
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

// group arrays with the same value in an array
// * the value need to be sorted first
function groupArray(array) {
    let new_array = [[]];
    let set_slot = 0;
    let value_1 = null;
    let value_2 = null;
    for (let i in array) {
        value_1 = array[i][0][2];       // change this according to the value to compare
        if (set_slot == 0) {
            new_array[set_slot] = new_array[set_slot].concat([array[i]]);
            value_2 = array[i][0][2];   // change this according to the value to compare
            set_slot++;
        } else if (value_1 == value_2) {
            new_array[set_slot-1] = new_array[set_slot-1].concat([array[i]]);
        } else if (value_1 != value_2) {
            new_array = new_array.concat([[array[i]]]);
            value_2 = value_1;
            set_slot++;
        }
    }
    return new_array;
}

// [[1,2],[5,4],[3,6]] -> [1,2,5,4,3,6]
function breakArray(array){
    let x = [];
    for (let i in array) {
        for (let j in array[i]) {
            x = x.concat([array[i][j]]);
        }
    }
    return x;
}

// from internet --------------------------------- have to edit and combine with below function later
function getDifference(setA, setB) {
    return new Set(
        [...setA].filter(element => !setB.has(element))
    );
}

function returnExclude(sample, set, returnArray=true) {
    let sample_array = [];
    let set_array = [];
    let excluded = [];
    // turn sample and set into array
    for (let i in sample) {
        sample_array = sample_array.concat(sample[i]);
    }
    for (let i in set) {
        set_array = set_array.concat(set[i]);
    }

    // try to find the excluded set (not finish) ***!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (let i in sample_array) {
        for (let j in set) {
            if (sample_array[i] == set[j] ) {
                break;
            } else if (sample_array[i] != set_array[set_array.length-1]) {
                excluded = excluded.concat(sample_array[i]);
                break;
            }
        }
    }

    // return as string or array
    if (returnArray) {
        return excluded;
    } else if (!returnArray) {
        let str_excluded = "";
        for (let i in excluded) {
            str_excluded = str_excluded.concat(excluded[i]);
        }
        return str_excluded;
    }
}

//----------------------------show data---------------------------
/** 
//show all the components for each sets
for (let i in sets_decomposition) {
    console.log(sets_decomposition[i][1]);
}
//print the length of string in each array
for (let i in sets_decomposition) {
    let n = parseInt(i)+1;
    console.log((n * interval_length) + ": " + sets_decomposition[i][0].length + " | " + sets_decomposition[i][1].length + " | " + sets_decomposition[i][2].length);
}
**/
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
        sets_w_components[i][j][0] = sets_w_components[i][j][0].concat(sets_w_components[i][j][1].length);          // add component counts
    }
}

//-------------------------sort sets_w_component---------------------------//


let sets_sort_radical_counts_1 = []   // sort 1 step
sets_sort_radical_counts_1 = sets_sort_radical_counts_1.concat(sets_w_components);  

let sets_sort_stroke_counts_2_pseudo = [];
let sets_sort_stroke_counts_2 = [];
let sets_sort_radical_groups = [];  // didn't use but can be used to analyze data

for (let i in sets_sort_radical_counts_1) {
    sets_sort_radical_counts_1[i].sort((a,b) => b[1].length - a[1].length)   //sort with radical counts
}

sets_sort_stroke_counts_2_pseudo = sets_sort_stroke_counts_2_pseudo.concat(sets_sort_radical_counts_1);
for (let i in sets_sort_stroke_counts_2_pseudo) {
    sets_sort_stroke_counts_2_pseudo[i] = groupArray(sets_sort_stroke_counts_2_pseudo[i]);  // group radical based on radical counts
}

for (let i in sets_sort_stroke_counts_2_pseudo) {
    for (let j in sets_sort_stroke_counts_2_pseudo[i]) {
        sets_sort_stroke_counts_2_pseudo[i][j].sort((a,b) => a[0][1] - b[0][1]);      // sort by stroke count
    }
}

sets_sort_radical_groups = sets_sort_radical_groups.concat(sets_sort_stroke_counts_2_pseudo);


// remove grouping in sets_sort_stroke_counts_2_pseudo / sets_sort_radical_groups for sets_sort_stroke_counts_2
for (let i in sets_sort_stroke_counts_2_pseudo) {
    sets_sort_stroke_counts_2 = sets_sort_stroke_counts_2.concat([[]]);
    sets_sort_stroke_counts_2[i] = sets_sort_stroke_counts_2[i].concat(breakArray(sets_sort_stroke_counts_2_pseudo[i]));
}

//-------------------FIND CHARACTER SET-----------------------//
let final_set = [];
let candidate_pool = [];
candidate_pool = candidate_pool.concat(sets_sort_stroke_counts_2);

full_kangxi = kangxi_file.split("\r\n").join("").replace(/ /g, "");     // probably not used but only for testing

function findOptimizedSet(candidate, radicals) {
    let final_set = [[], 0];    // [[set],stroke]
    let notFoundRadicals = [];

    let func_radicals = [];     //to not change the original data when using function
    func_radicals = func_radicals.concat(radicals);
    let func_candidate = [];
    func_candidate = func_candidate.concat(candidate);

    let haveRadical = false;

    for (let i in func_candidate) {
        for (let j in func_candidate[i][1]) {
            for (let k in func_radicals) {
                for (let l in func_radicals[k]) {
                    if (func_candidate[i][1][j] == func_radicals[k][l]) {
                        haveRadical = true;
                        func_radicals[k] = 0;
                    }
                }
            }
        }

        if (haveRadical) {
            final_set[0] = final_set[0].concat(func_candidate[i][0][0]);    //add character to final list
            final_set[1] = final_set[1] + func_candidate[i][0][1];          //add stroke count
            haveRadical = false;
        }
    }
    
    for (i in func_radicals) {
        if (func_radicals[i] != 0) {
            notFoundRadicals = notFoundRadicals.concat([func_radicals[i]]);
        }
    }

    final_set = final_set.concat([notFoundRadicals]);
    return final_set;       //[[character set], total stroke, [not found radical set]]
}



//[["character", stroke, component_count],["c","h","a","r","t","e"]]
//candidate_pool[0] = [[["birD", 4, 4],["b","i","r","D"]],[["dog",3,3],["d","o","g"]],[["do",2,2],["d","o"]],[["deer",4,3],["d","e","r"]]];
//radicals = [["b","B"],["d","D"],["e","E"],["o"],["i"],["g","G"],["r","R"],["z"]];
findOptimizedSet(candidate_pool[4], radicals);
//console.log(require('util').inspect(sets_sort_stroke_counts_2, false, null, true));
//console.dir(sets_sort_stroke_counts_2_pseudo, {'maxArrayLength': 10})
//console.log(sets_sort_stroke_counts_2_pseudo);
