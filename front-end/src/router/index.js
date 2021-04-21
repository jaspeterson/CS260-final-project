import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ThreadView from "../views/ThreadView.vue";
import Login from "../views/Login.vue";
import UserView from "../views/UserView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/thread/:id",
    name: "ThreadView",
    component: ThreadView,
    props: true
  },
  {
    path: "/login",
    name: 'Login',
    component: Login,
  },
  {
    path: "/user/:id",
    name: "UserView",
    component: UserView,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
