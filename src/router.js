import Vue from "vue";
import Router from "vue-router";
import Img2Base from "./views/format/img2base.vue";
import FmJson from "./views/format/json.vue";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            redirect: '/fm/json'
        },
        {
            path: "/fm/json",
            name: "fmjson",
            component: FmJson
        },
        {
            path: "/fm/img2base",
            name: "img2base",
            component: Img2Base
        }
    ]
});
