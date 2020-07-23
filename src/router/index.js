import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VueNotes from '@/components/VueNotes'
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
      path: '/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/notes',
      name: 'VueNotes',
      component: VueNotes,
      meta: {
        requriesAuth: true
      }
    }
  ]
})
router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
