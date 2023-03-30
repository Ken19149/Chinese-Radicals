const { Console } = require("console");
const fs = require("fs");

fs.readFile("kangxi radicals.txt", "utf-8", (err,data) => {
    if (err) throw err;
    data = data.replace(/\n/g, "").replace(/" "/g, "");     //remove new lines and spaces
    data = "abab"     //for testing
    const list = [];
    const str = "";

    //test
    list.push(data[0]);
    for (let i in data) {
        for (let j in list) {
            if (data[i]==list[j]) {
                console.log("skip " + data[i]);
                continue;
            } else if (data[i] != list[j] && ((list.length - 1) == j)) {
                list.push(data[i]);
                console.log("added " + data[i]);
            }
        }
    }
    console.log(list);
    for (let i in list) {
        console.log(list[i]);
    }
    console.log(str);
});