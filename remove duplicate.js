const fs = require("fs");

fs.readFile("kangxi radicals.txt", "utf-8", (err,data) => {
    if (err) throw err;
    data = data.replace(/\n/g, "").replace(/" "/g, "");     //remove new lines and spaces
    data = "aaabbc"
    const list = [];

//  not finished
    for (let i in data) {
        if ((data[i]) in list) {
            console.log(data[i] + " is in the list");
        } else {
            console.log(data[i], "is not in the list");
            list.push(data[i]);
            console.log(data[i], "added");
        }
    } 
    console.log(list);
});