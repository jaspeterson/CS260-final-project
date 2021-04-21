<template>
    <div>
        <div v-if="checkUser">
            <button @click="logout" class="pure-button pure-button-primary">Logout</button>
        </div>
        <h1>{{ user.firstName }} {{ user.lastName }}</h1>
        <hr>
        <div class="thread-list">
            <div v-for="thread in userThreads" v-bind:key="thread._id">
                <router-link :to="{ name: 'ThreadView', params: { id: thread._id }}" class="thread-link"><thread :threadID=thread._id /></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Thread from '../components/Thread.vue';

export default {
    name: 'UserView',
    components: {
        Thread,
    },
    props: {
        id: String
    },
    data() {
        return {
            userThreads: [],
            user: {}
        }
    },
    async created() {
        await this.getUser();
        this.getUserThreadList();
    },
    methods: {
        async logout() {
            try {
                await axios.delete("/api/users");
                this.$root.$data.user = null;
            } catch (error) {
                this.$root.$data.user = null;
            }
            this.$router.push('/');
        },
        async getUserThreadList() {
            try {
                let response = await axios.get("/api/thread/userThreads/" + this.user._id);
                this.userThreads = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getUser() {
            try {
                let response = await axios.get("/api/users/id/" + this.id);
                this.user = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        checkUser() {
            return this.$root.$data.user._id === this.user._id;
        }
    }
}
</script>

<style scoped>
.thread-link {
  text-decoration: none;
  color: black;
}

.thread-list {
  width: 80%;
  margin: auto;
}

.topic-post {
  margin-bottom: 10px;
}
</style>