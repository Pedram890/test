import { Loading } from 'quasar'
export default async ({ app, router, Vue, store }) => {
  await new Promise(async (resolve, reject) => {

    await fetch("env/env.json")
      .then(res => res.json())
      .then(res => {
        store.dispatch('env/setEnv', res).then(env => {
          resolve()
        })
      })
  })
}
