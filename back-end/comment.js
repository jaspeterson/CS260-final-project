const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const thread = require("./thread.js");
const Thread = thread.model;

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// Comment
    // Text
    // Thread id
    // Date posted

const commentSchema = new mongoose.Schema({
    text: String,
    thread: {
        type: mongoose.Schema.ObjectId,
        ref: 'Thread'
    },
    posted: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

//post a comment
//get all comments for thread

router.post("/:id", validUser, async(req, res) => {
    try {
        let thread = await Thread.findOne({
            _id: req.params.id
        });

        if (thread) {
            const comment = new Comment({
                text: req.body.text,
                thread: thread,
                user: req.user
            });

            await comment.save();
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/:id", async(req, res) => {
    try {
        let thread = await Thread.findOne({
            _id: req.params.id
        });

        if (thread) {
            let oomments = await Comment.find({
                thread: thread
            }).populate('user');
            return res.send(oomments);
        } else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Comment,
    routes: router,
}