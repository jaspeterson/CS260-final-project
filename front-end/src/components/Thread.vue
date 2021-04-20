<template>
    <section class="thread">
        <div class="thread-container">
            <div class="thread-details">
                <div class="thread-rating">
                    <button @click.prevent="increaseRating()" class="pure-button vote-button">+</button>
                    <div class="rating-text">{{ thread.rating }} points</div>
                </div>
                <div>{{formatDate(thread.posted)}}</div>
            </div>
            <div class="thread-main">
                <h1>{{ thread.topic }}</h1>
                <p class="thread-text">{{ thread.text }}</p>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default ({
    name: 'Thread',
    props: {
        threadID: String
    },
    data() {
        return {
            thread: {}
        }
    },
    created() {
        this.getThread();
    },
    methods: {
        formatDate(date) {
            return moment(date).format('d MMMM YYYY');
        },
        async getThread() {
            try {
                let response = await axios.get("/api/thread/" + this.threadID);
                this.thread = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async increaseRating() {
            try {
                await axios.put("/api/thread/" + this.threadID);
                this.getThread();
            } catch (error) {
                console.log(error);
            }
        }
    }
})
</script>

<style scoped>
.thread-container {
    box-shadow: 5px 5px 10px 2px gray;
    padding: 10px;
    margin: 20px;
    border-radius: 25px;
    text-align: left;
    display: flex;
}

.thread-details {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    padding: 10px;
    border-radius: 10px;
    justify-content: center;
}

.thread-main {
    display: flex;
    flex-direction: column;
}

.thread-main h1 {
    padding: 10px;
    padding-bottom: 0;
    margin: 0;
}

.thread-text {
    padding: 10px;
}

.thread-rating {
    border-bottom: 1px solid gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}

.rating-text {
    text-align: center;
}

.vote-button {
    width: 50%;
    margin: auto;
    border: 1px solid black;
    border-radius: 25%;
    background-color: white;
}

.vote {
    margin: auto;
}

.star {
    visibility:hidden;
    font-size:60px;
    cursor:pointer;
    content: "\2605";
    margin: auto;
}

.star:checked:before {
   content: "\2605";
   position: absolute;
}

.star:before {
   content: "\2606";
   visibility: visible;
   position: absolute
}
</style>
