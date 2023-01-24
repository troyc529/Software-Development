/**
 * Team 2
 * CSC 648
 * Description: provides main navigation for traversing
 * web pages
 */
var express = require('express');
const Joi = require('joi');
const passport = require('passport');
var db = require('../conf/databseSetup');
const controller = require('../controller/file.controller');
var router = express.Router();
const app = express();




app.use(express.static(__dirname + '/public'));


router.get("/files", passport.session(), controller.getListFiles);

router.get("/files/:name", passport.session(), controller.download);



router.get('/', function (req, res, next) {
    res.render('Home.hbs', {
        desc: "<h1>Software Engineering class SFSU</h1><h3>Fall, 2022</h3><h3>CSC 648</h3><h3>Team 2</h3>"
    });
});

router.get('/createPost', function (req, res, next) {
    res.render('createPost.hbs');
});

router.get('/About', function (req, res, next) {
    res.render('About.hbs');
});


router.get('/result-page', function (req, res, next) {
    res.render('result-page.hbs');
});

router.get('/login', function (req, res, next) {
    res.render('login.hbs');
});

router.get('/Registration', function (req, res, next) {
    res.render('Registration.hbs');
});
router.get('/User-Profile', passport.session(), function (req, res, next) {

    if (!req.user) {
        res.status(401).send();
    }
    else {
        res.render('User-Profile.hbs');
    }
});

router.get('/Product-info', function (req, res, next) {
    res.render('Product-info.hbs');
});


router.get('/change-email', function (req, res, next) {
    res.render('change-email.hbs');
});
router.get('/productInfo-user', function (req, res, next) {
    res.render('productInfo-user.hbs');
});

router.get('/MessageTheSeller', function (req, res, next) {
    res.render('MessageTheSeller.hbs');
});

router.get('/change-password', function (req, res, next) {
    res.render('change-password.hbs');
});
router.get('/search', async (req, res, next) => {
    try {
        const schema = Joi.string().max(40).allow("");

        const validated = await schema.validateAsync(req.query.search);

        let search_term = validated
        let category = req.query.category;
        if (!search_term && !category) {
            res.send({
                resultsStatus: "info",
                messages: "no search or category given",
                results: []
            });
        }
        else {
            switch (category) {
                case "eBook":
                    category = 1
                    break;
                case "Video":
                    category = 2
                    break;
                case "Image":
                    category = 3
                    break;
                case "Audio":
                    category = 4
                    break;
                default:
            }

            console.log("Entered the actuals search");
            var queryPrompt;
            if (category == "All" && search_term) {
                queryPrompt = `SELECT * FROM Posts
            WHERE name LIKE '%${search_term}%' AND approved = 1`;
            }
            else if (category == "All") {
                queryPrompt = `SELECT * FROM Posts WHERE approved = 1`;
            }
            else if (!search_term) {
                queryPrompt = `SELECT * FROM Posts
            WHERE category = "${category}" AND approved = 1`;
            }
            else {
                queryPrompt = `SELECT * FROM Posts
        WHERE category = '${category}'
        AND (name LIKE '%${search_term}%')
        AND approved = 1;
        `;
            }

            let results;
            await db.query(queryPrompt)
                .then((result) => {
                    results = result[0];
                })

            if (results.length === 0) {
                await db.query('SELECT * FROM Posts WHERE approved = 1')
                .then((result) =>{
                    res.send({
                        messages: "ZERO RESULTS",
                        results: result[0]
                    })
                });
            } else {
                res.send({
                    resultsStatus: "info",
                    messages: "no search term given",
                    results: results
                })
            }

        }
    } catch (e) {
        next(e)
    }
});



// Sending the About.hbs users as id to About-idex.hbs
// Rendering the About-idex.hbs page with individual data
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    if (id == 'Nanda') {
        res.render('About-index.hbs', {
            img: "/images/Nanda.jpg",
            name: "Nanda Pandian",
            role: "Team Lead",
            desc: "I am currently a senior pursuing Bachelors in Computer Science at SFSU. I have been in the working industry for about one to two years. I initially started as a pre-med student, but I ended up in computer science as a later interest. Fun fact about me is I am a road cyclist. Other hobbies include working out, hiking, exploring new nature places, and reading.",
            linkedin: "https://www.linkedin.com",
            github: "https://github.com/nandap1"
        });
    }
    else if (id == 'Farid') {
        res.render('About-index.hbs', {
            img: "/images/Farid.jpg",
            name: "Farid",
            role: "Front-end Lead",
            desc: "My name is Farid and I am a student (Bachelor of Science in Computer Science)currently attending San Francisco State University. I moved to the United States in August of 2016, and programming has always been my strength. I have always considered Farsi to be my first language, coding to be my second, and English to be my third.",
            linkedin: "https://www.linkedin.com/in/farid-mehdipour/",
            github: "https://github.com/Faridmhp"
        });
    }
    else if (id == 'Hugo') {
        res.render('About-index.hbs', {
            img: "/images/Hugo.jpg",
            name: "Hugo Moreno",
            role: "Software Engineer",
            desc: "My name is Hugo and I am a computer science major at San Francisco State University. I am Mexican-American and I am also a first generation college student. My interest in programming began because I was always a great problem solver and had unique solutions to difficult problems. I am always trying to learn more and improve my programming skills in any way that I can.",
            linkedin: "https://www.linkedin.com/in/hugo-moreno-/",
            github: "https://github.com/hugo215"
        });
    }
    else if (id == 'Richard') {
        res.render('About-index.hbs', {
            img: "/images/Richard.jpg",
            name: "Richard Aguilar",
            role: "Back-End Lead",
            desc: "My name is Richard Aguilar I am a Computer Science Senior at San Francisco State University. I transferred after 3 Years at Riverside Community College with an Associates of Science in Computer Science. I have worked in teams of different sizes in different technologies like AR, VR, Mobile development, and embedded systems. A fun fact about me is that i have travelled to most of the countries in eastern europe, but have never visited western Europe.",
            linkedin: "https://www.linkedin.com/in/richard-w-aguilar/",
            github: "https://github.com/raguilar0917",
            portfolio: "http://www.raguilar.tech/"
        });
    }
    else if (id == 'Troy') {
        res.render('About-index.hbs', {
            img: "/images/Troy.jpg",
            name: "Troy Carloni",
            role: "Github Master",
            desc: "I am in my last semester at SFSU working on a Bachelors in Computer Science. I spent six years Active Duty in the AirForce before separating and commiting to being a full time student. I am originally from Massachusetts and have been living in the Bay Area for four years.",
            linkedin: "https://www.linkedin.com/in/troy-carloni-905693240/",
            github: "https://github.com/troyc529",
            portfolio: "https://troyc529.github.io/"
        });
    }
    else if (id == 'Yuwei') {
        res.render('About-index.hbs', {
            img: "/images/Yuwei.jpg",
            name: "Yuwei Liu",
            role: "Software Developers",
            desc: "Hello my name is Yuwei, I come from China and I have studies for 1 year in sfsu. I think computer science is challenge for as well as the teamwork. Let's do it!",
            linkedin: "https://www.linkedin.com",
            github: "https://github.com/vivilis"
        });
    }
    else { }
});




router.get('/Message', passport.session(), function (req, res, next) {

    if (!req.user) {
        res.status(401).send();
    }
    else {
        res.render('Message.hbs');
    }
});

module.exports = router;
