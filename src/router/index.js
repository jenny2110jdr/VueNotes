import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VueNotes from '@/components/VueNotes'
import Funny from '@/components/Funny'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-602901.okta.com/oauth2/default',
  client_id: '0oalki67r43GJUW8U4x6',
  redirect_uri: 'http://localhost:8080/callback'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/notes',
      name: 'VueNotes',
      component: VueNotes,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/funny',
      name: 'Funny',
      component: Funny,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/callback',
      component: Auth.handleCallback()
    }
  ]
})
router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
