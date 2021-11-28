//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "The IRCTC was established on 27 September 1999,[5] as a public sector undertaking completely owned by the Government of India through the Indian Railways. It is the only entity that is authorised to provide certain services to the Indian Railways, including online ticketing, catering, and selling drinking water on trains and at railway stations. In May 2008, it was classed as a Miniratna public corporation, which allowed it a certain degree of financial autonomy.";
const aboutContent = "Indian Railway Catering and Tourism Corporation (IRCTC) is an Indian public sector undertaking that provides ticketing, catering, and tourism services for the Indian Railways. It was initially wholly owned by the Government of India and operated under the administrative control of the Ministry of Railways, but has been listed on the National Stock Exchange since 2019, with the Government continuing to hold majority ownership";
const contactContent = "Customer Care Numbers : 0755-6610661, 0755-4090600 (Language: Hindi and English).. For IRCTC SBI Card users who do not receive the card within 01 month from the date of application kindly call on the Railway SBI Card Helpline nos. at 0124-39021212 or 18001801295 (if calling from BSNL/MTNL line) or send email to customercare@sbicard.com. For other queries on your IRCTC SBI card account, kindly email at loyaltyprogram@irctc.co.in";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res) {
    res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
    });
});

app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactContent });
});

app.get("/book", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {
    const post = {
        name: req.body.name,
        fst: req.body.fst,
        tst: req.body.tst,
        date: req.body.date,
        mno: req.body.mno,
        email: req.body.email,
        tno: req.body.tno,
        tname: req.body.tname
    };

    posts.push(post);

    res.redirect("/");

});

app.get("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.name);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                name: post.name,
                fst: post.fst,
                tst: post.tst,
                date: post.date,
                mno: post.mno,
                email: post.email,
                tno: post.tno,
                tname: post.tname
            });
        }
    });

});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});