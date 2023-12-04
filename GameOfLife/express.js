// var express = require("express")
// var app = express()
// var fs = require('fs');

// function main(){
// var file = "hello.txt";

// fs.appendFileSync(file, "Hello world\n");
// }
// main();
// app.use(express.static("."))



// app.get("/", function(req, res){
//     res.redirect("index.html")
// })

// app.get("/name/:name", function(req, ras){
//     res.send("<h1> hello Lusine </h1>")
// })

// app.get("/name/:name", function(req, res){
//     var name = req.params.name;
//     res.send("<h1>Hello " + name +"</h1>");
//     })

// app.listen(3000, function(){
//     console.log("Server is run")
// })

// var fs = require('fs');
// function main(){
// fs.writeFile("hello.txt", "Hello world\n", function(err){
// console.log("fs.writeFile ended");
// });
// console.log("fs.writeFile");
// }
// main();

var fs = require('fs');
var dummyText = "Apple yep";

function main() {
fs.writeFileSync("dummytext.txt", dummyText);
var text = fs.readFileSync("dummytext.txt").toString();
console.log(dummyText == text);
console.log(text);
fs.writeFileSync("undummytext.txt",
text.replace("Apple", "Microsoft")
);
}
main();