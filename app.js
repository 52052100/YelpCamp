var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "First", image: "data:image/jpeg;base64,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"}
]

app.get('/', (req,res) => {
    res.render("landing");
})

app.get('/campgrounds', (req,res) => {

    res.render('campgrounds', {campgrounds:campgrounds})
})

app.post("/campgrounds", function(req,res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
    console.log(newCampground)
    campgrounds.push(newCampground)
    res.redirect('/campgrounds')
})

app.get("/campgrounds/new", function(req,res) {
    res.render("new.ejs");
})

app.listen(3000, () => {
    console.log('listen to 3000!!!')
})