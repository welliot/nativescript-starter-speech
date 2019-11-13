import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import Vuex from 'vuex';

Vue.use(Vuex)
Vue.use(RadSideDrawer);

Vue.config.silent = (TNS_ENV === 'production');

const shipStore = new Vuex.Store({
  state: {
    count: 0,
    speechAvailable: false
  },
  mutations: {
    increaseCount(state) {
      state.count++;
    },
    setSpeechAvailable(state, payload) {
      state.speechAvailable = payload.avail;
    }
  },
  actions: {
    setSpeechAvailable2({commit}, val) {
      commit('setSpeechAvailable', val);
    }
  }
});

new Vue({
    store: shipStore,
    render: (h) => {
        return h(
          App,
          [
            h(DrawerContent, { slot: 'drawerContent' }),
            h(Home, { slot: 'mainContent' })
          ]
        )
      }
  }).$start();
