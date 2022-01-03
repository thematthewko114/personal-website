import store from '../store/index.js'

export default (to, from, next) => {
  if (store.getters.users) {
    next()
  } else {
    next('/projects/revisionprogress/login')
  }
}
