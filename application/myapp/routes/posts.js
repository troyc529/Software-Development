/**
 * Team 2
 * CSC 648
 * Description: provides functions for accessing and 
 *  manipulating user post data stored in database
 */

var express = require('express');
var router = express.Router();
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var db = require('../conf/databseSetup');
const Joi = require("joi");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/uploads")
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(12).toString("hex");
        cb(null, `${randomName}.${fileExt}`)
    }
});

var uploader = multer({ storage: storage });


//needs to be updated once front end is implemented
router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {

    if (!req.user) {
        return res.redirect("/Login").status(200).send()
    }

    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationfile = req.file.destination + "/" + req.file.filename;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let asking_price = req.body.Price;
    let email = req.user[0][0].email;

    let category = "";
    switch (req.body.category) {
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
    }
    try {
        sharp(fileUploaded)
            .resize(200)
            .toFile(destinationOfThumbnail)
            .then(() => {
                const queryPrompt = `INSERT INTO Posts(email, name, category, description, asking_price, image, image_thumbnail, date_time, approved) 
                VALUES ('${email}','${title}', ${category} , '${description}','$${asking_price}', '${destinationfile}','${destinationOfThumbnail}', NOW(), 0)`
                db.query(queryPrompt)
            })


        return res.redirect("/User-Profile").status(200).send()

    }
    catch (e) {
        next(e)
    }
});

router.post("/message", async (req, res, next) => {
    try {

        const schema = Joi.string().min(1).max(80).required()

        const validated = await schema.validateAsync(req.body.message);

        const queryPrompt = `INSERT INTO Message_Inbox(post_id, message_txt, date_time, message_sender_info) VALUES (${req.body.post_id}, '${validated}', NOW(), '${req.user[0][0].email}');`
        await db.query(queryPrompt)
        return res.status(200).send();
    } catch (e) {
        next(e)
    }
})




//gets post by post ID
// syntax example: /posts/getPost?post_id=1
// the above example would be your fetch request
// send as param not in body
router.get("/getPost", async (req, res, next) => {

    try {
        const schema = Joi.number().integer().min(1).max(1000000).required();

        const validated = await schema.validateAsync(req.query.post_id);

        const queryPrompt = `SELECT * FROM posts WHERE post_id = ${validated}`
        console.log(queryPrompt)
        const post = await db.query(queryPrompt)
            .then(([rows]) => {
                return rows[0];
            })

        return res.status(200).send(post)
    } catch (e) {
        next(e)
    }

})

router.get("/getUsersPost", async (req, res, next) => {

    try {
        const queryPrompt = `SELECT * FROM posts WHERE email = ${req.query.email}`
        console.log(queryPrompt)
        const post = await db.query(queryPrompt)
            .then(([rows]) => {
                return rows[0];
            })

        return res.status(200).send(post)
    } catch (e) {
        next(e)
    }

})
router.get("/getRecentPosts", async (req, res, next) => {

    try {
        const queryPrompt = `SELECT * FROM posts WHERE email = ${req.query.email}`
        console.log(queryPrompt)
        const post = await db.query(queryPrompt)
            .then(([rows]) => {
                return rows[0];
            })

        return res.status(200).send(post)
    } catch (e) {
        next(e)
    }

})

//gets message inbox associated with post by post_id
// syntax example: /posts/getmessageInbox?post_id=1
// the above example would be your fetch request
router.get("/getmessageInbox", async (req, res, next) => {

    try {
        const schema = Joi.number().integer().min(1).max(1000000).required();

        const validated = await schema.validateAsync(req.query.post_id);

        const queryPrompt = `SELECT * FROM message_inbox WHERE post_id = ${validated}`
        console.log(queryPrompt)
        const message_Inbox = await db.query(queryPrompt)
            .then(([rows]) => {
                return rows;
            })

        return res.status(200).send(message_Inbox)

    } catch (e) {
        next(e)
    }

})



// /posts/deletePost
// requires post ID and user email, send in body
router.post("/deletePost", async (req, res, next) => {
    try {

        const schema = Joi.object({
            post_id: Joi.number().integer().min(1).max(1000000).required(),
            email: Joi.string().email().max(45).required()
        });

        const validated = await schema.validateAsync(req.body);

        const queryPrompt = `DELETE FROM Posts WHERE post_id = ${validated.post_id} AND email = '${validated.email}'`
        console.log(queryPrompt)
        await db.query(queryPrompt)

        return res.status(201).send()

    } catch (e) {
        next(e)
    }
})




module.exports = router;