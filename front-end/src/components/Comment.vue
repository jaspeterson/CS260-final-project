<template>
    <section class="comment">
        <div class="comment-container">
            <div class="comment-details">
                <div>{{formatDate(comment.posted)}}</div>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
        </div>
    </section>
</template>

<script>
import moment from 'moment';

export default ({
    name: 'Comment',
    props: {
        comment: Object
    },
    methods: {
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
                return moment(date).fromNow();
            else
                return moment(date).format('d MMMM YYYY');
        },
    }
})
</script>

<style scoped>
.comment-container {
    box-shadow: 5px 5px 10px 2px gray;
    padding: 10px;
    margin: 20px;
    border-radius: 25px;
    text-align: left;
    display: flex;
}

.comment-details {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    justify-content: center;
}

.comment-text {
    padding: 10px;
}

</style>
