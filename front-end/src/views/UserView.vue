<template>
    <div>
        <button @click="logout" class="pure-button pure-button-primary">Logout</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserView',
    data() {
        return {

        }
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
    }
}
</script>

<style scoped>

</style>