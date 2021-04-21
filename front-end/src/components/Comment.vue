<template>
    <section class="comment">
        <div class="comment-container">
            <div class="comment-details" @click.prevent="viewUserProfile()">
                <div>{{formatDate(comment.posted)}}</div>
                <div class="comment-author"> -- {{ comment.user.firstName }} {{ comment.user.lastName }}</div>
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
            return moment(date).format('d MMMM YYYY');
        },
        viewUserProfile() {
            this.$router.push('/user/' + this.comment.user._id);
        }
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
    cursor: pointer;
}

.comment-author {
    font-style: italic;
}

.comment-text {
    padding: 10px;
}

</style>
