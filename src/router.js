import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '/',
      component: load('Index'),
      meta: { requiresAuth: true },
      children: [
        { path: '', component: load('Home') },
        { path: 'client/schedule', component: load('ClientSchedule') },
        { path: 'barber/schedule', component: load('BarberSchedule') },
        { path: 'barbers', component: load('Barbers') },
        { path: 'config', component: load('Config') },
        { path: 'profile', component: load('Profile') }
      ]
    },
    { path: '/login', name: 'login', component: load('Login'), params: { userJustCreated: '' } },
    { path: '/signup', name: 'signup', component: load('Signup') },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})

export default router

router.beforeEach(async (to, from, next) => {
  // TODO: Check if token validation is slowing down the application
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await store.dispatch('validateToken')
    }
    catch (e) {
      console.log(e)
      return next({ path: '/login', query: { redirect: to.fullPath } })
    }
    if (!store.state.user.username) await store.dispatch('retrieveUserInformation')
  }
  next()
})
