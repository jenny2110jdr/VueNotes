<template>
  <div id="app">
    <header>
      <span>Vue.js VueNotes
        <b-button class="float-right" @click.prevent="login" v-if="!loggedInUser">Login</b-button>
        <b-button class="float-right" @click.prevent="logout" v-if="loggedInUser">Logout</b-button>
      </span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      loggedInUser: null
    }
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
      this.$router.push('/notes')
    },
    async checkLoggedInUser () {
      this.loggedInUser = await this.$auth.getUser()
    },
    async logout () {
      await this.$auth.logout()
      await this.checkLoggedInUser()
      this.$router.push('/')
    }
  },
  async created () {
    await this.checkLoggedInUser()
  },
  watch: {
    '$route': 'checkLoggeInUser'
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
