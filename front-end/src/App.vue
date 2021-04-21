<template>
  <div id="app">
    <router-link to="/" class="header-link"><div></div><h1 class="header">The Forum</h1><router-link to="/login" class="login-link">{{ loginMsg }}</router-link></router-link>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <div> ~ </div>
      <a class="footer-link" href="https://github.com/jaspeterson/CS260-final-project">github</a>
      <div> ~ </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
  computed: {
    loginMsg() {
      if (this.$root.$data.user == null) {
        return "Login";
      } else {
        return this.$root.$data.user.firstName + " " + this.$root.$data.user.lastName;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-link {
  text-decoration: none;
  color: black;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  /* left: 50%;
  transform: translate(-50%, 0); */
}

.header {
  margin-left: 80px;
}

.login-link {
  padding: 20px;
  text-decoration: none;
  color: #0078E7;
}

.content {
  min-height: 84vh;
  margin-top: 2vh;
}

.footer {
  height: 6vh;
  padding: 20px 100px 0px 100px;
  display: flex;
  justify-content: center;
}
.footer a {
  color: #000;
  margin: 0 20px 0 20px;
  text-decoration: none;
}
</style>
