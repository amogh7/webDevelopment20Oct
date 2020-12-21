let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];


// Async Task => Serially ?


// for loop => while loop => ?
let idx=0;

while(idx<files.length){
    fs.readFile(files[idx] , function(err,data){
        console.log("Content " + data);
        idx=idx+1;
    });
}




// recursive code
// function fileReader(idx){
//     if(idx==files.length){
//         return;
//     }
//     fs.readFile(files[idx] , function(err,data){
//         console.log("Content " + data);
//         fileReader(idx+1);
//     });
// }

// fileReader(0);