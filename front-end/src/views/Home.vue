<template>
  <div class="home">
    <!-- post thread -->
    <form class="pure-form" @submit.prevent="postThread">
      <fieldset>
        <legend>Post a thread</legend>
        <input class="pure-u-1-5 topic-post" placeholder="Thread topic" v-model="threadTopic"/>
        <br>
        <textarea class="pure-u-1-2" placeholder="Thread content" v-model="threadText" />
        <button type="submit" class="pure-button pure-button-primary buttons" @click.prevent="postThread">Post</button>
      </fieldset>
    </form>
    <!-- filter bar -->
    <form class="pure-form" @submit.prevent="filterThreads">
      <fieldset>
        <legend>Filter by topic</legend>
        <select class="topic-select pure-u-1-3" v-model="filteredTopic" value="filteredTopic">
          <option v-for="topic in topics" v-bind:key="topic">{{ topic }}</option>
        </select>
        <button class="pure-button pure-button-secondary buttons" @click.prevent="clearFilter">Clear</button>
      </fieldset>
    </form>

    <!-- thread list -->
    <h2>Threads</h2>
    <hr>
    <div class="thread-list">
      <div v-for="thread in filteredThreads" v-bind:key="thread._id">
        <router-link :to="{ name: 'ThreadView', params: { id: thread._id }}" class="thread-link"><thread :threadID=thread._id /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Thread from '../components/Thread.vue';

export default {
  components: { Thread },
  name: "Home",
  data() {
    return {
      threads: [],
      filteredTopic: '',
      threadText: '',
      threadTopic: ''
    }
  },
  created() {
    this.getThreadList();
  },
  methods: {
    async getThreadList() {
      try {
        let response = await axios.get("/api/thread");
        this.threads = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async postThread() {
      if (!this.threadText)
        return;
      try {
        await axios.post("/api/thread", {
          text: this.threadText,
          topic: this.threadTopic
        });

        this.threadText = '';
        this.threadTopic = '';

        this.getThreadList();
      } catch (error) {
        console.log(error);
      }
    },
    clearFilter() {
      this.filteredTopic = '';
    }
  },
  computed: {
    topics() {
      let topics = new Set();
      this.threads.forEach(thread => {
        topics = topics.add(thread.topic);
      });
      return Array.from(topics);
    },
    filteredThreads() {
      let threads = [];
      if (this.filteredTopic == '') {
        threads = this.threads;
      } else {
        this.threads.forEach(thread => {
        if (thread.topic == this.filteredTopic)
          threads.push(thread);
        });
      }
      threads.sort((a, b) => b.rating - a.rating);
      return threads;
    }
  }
};
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

.buttons {
  margin: 10px;
}
</style>