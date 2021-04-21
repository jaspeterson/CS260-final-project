// Thread
    // Text
    // Rating
    // Date posted
    // Topic? -- maybe add later
    // List of comments? -- probably not

const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const threadSchema = new mongoose.Schema({
    text: String,
    rating: Number,
    posted: {
        type: Date,
        default: Date.now
    },
    topic: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Thread = mongoose.model('Thread', threadSchema);

//post a thread
router.post("/", validUser, async(req, res) => {
    const thread = new Thread({
        text: req.body.text,
        rating: 0,
        topic: req.body.topic,
        user: req.user
    });

    try {
        await thread.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get all threads
router.get("/", async(req, res) => {
    try {
        let threads = await Thread.find().populate('user');
        return res.send(threads);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get one thread by id
router.get("/id/:id", async(req, res) => {
    try {
        let thread = await Thread.findOne({
            _id: req.params.id
        }).populate('user');
        return res.send(thread);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get threads by user
router.get("/userThreads/:id", validUser, async(req, res) => {
    try {
        let user = await User.findOne({
            _id: req.params.id 
        });
        if (user != null) {
            let threads = await Thread.find({
                user: user
            }).populate('user');
            return res.send(threads);
        }
        return res.sendStatus(400);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//increase rating on thread
router.put("/:id", validUser, async(req, res) => {
    try {
        let thread = await Thread.findOne({
            _id: req.params.id
        });
        if (thread != null) {
            thread.rating = thread.rating + 1;
            await thread.save();
        }
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

module.exports = {
    model: Thread,
    routes: router,
}