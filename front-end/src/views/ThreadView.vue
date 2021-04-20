<template>
    <div>
        <thread :threadID=id />
        <h2>Comments</h2>
        <hr>
        <form class="pure-form" @submit.prevent="postComment">
            <fieldset>
                <textarea class="pure-u-1-2" placeholder="Comment" v-model="commentText" />
                <button type="submit" class="pure-button pure-button-primary buttons">Post</button>
            </fieldset>
        </form>
        <div class="comment-list">
            <div v-for="comment in comments" v-bind:key="comment._id">
                <comment :comment="comment" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Thread from '../components/Thread.vue';
import Comment from '../components/Comment.vue';

export default ({
    name: "ThreadView",
    props: {
        id: String,
    },
    components: {
        Thread,
        Comment
    },
    data() {
        return {
            thread: {},
            comments: [],
            commentText: ''
        }
    },
    created() {
        this.getThread();
        this.getCommentList();
    },
    methods: {
        async getCommentList() {
            try {
                let response = await axios.get("/api/comment/" + this.id);
                this.comments = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getThread() {
            try {
                let response = await axios.get("/api/thread/" + this.id);
                this.thread = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async postComment() {
            try {
                if (!this.commentText)
                    return;
                await axios.post("/api/comment/" + this.id, {
                    text: this.commentText
                });
                this.commentText = '';
                this.getCommentList();
            } catch (error) {
                console.log(error);
            }
        }
    }
})
</script>

<style scoped>
.comment-list {
    width: 80%;
    margin: auto;
}

.buttons {
  margin: 10px;
}
</style>
