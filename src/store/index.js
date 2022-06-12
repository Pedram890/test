import Vue from 'vue'
import Vuex from 'vuex'
import env from './env'
import createPersistedState from "vuex-persistedstate";
import VuexPersistence from 'vuex-persist'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    env:state.env,
  })
})

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      env
    },
    plugins: [createPersistedState()],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
    plugins: [vuexLocal.plugin]
  })

  return Store
}
