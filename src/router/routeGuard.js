import {store} from '../store/index.js'

export default (to, from, next) => {
  console.log(store.getters.user)
  if (store.getters.user) {
    next()
  } else {
    next('/projects/revisionprogress')
  }
}
