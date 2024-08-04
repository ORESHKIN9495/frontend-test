import Vue from "vue";

//Main pages
import App from "./views/App.vue";

Vue.config.productionTip = false;

import store from "./store";

new Vue({
    components: { App },
    store,
    render: (h) => h(App),
}).$mount("#app");
