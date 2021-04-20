// Thread
    // Text
    // Rating
    // Date posted
    // Topic? -- maybe add later
    // List of comments? -- probably not

const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const threadSchema = new mongoose.Schema({
    text: String,
    rating: Number,
    posted: {
        type: Date,
        default: Date.now
    },
    topic: String
});

const Thread = mongoose.model('Thread', threadSchema);

//post a thread
router.post("/", async(req, res) => {
    const thread = new Thread({
        text: req.body.text,
        rating: 0,
        topic: req.body.topic,
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
        let threads = await Thread.find();
        return res.send(threads);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get one thread
router.get("/:id", async(req, res) => {
    try {
        let thread = await Thread.findOne({
            _id: req.params.id
        });
        return res.send(thread);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//increase rating on thread
router.put("/:id", async(req, res) => {
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