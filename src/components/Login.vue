<template>
  <div class="layout-padding">
    <div class="login-form">
      <h5>Login</h5>
      <form id="loginform" action="" @submit.prevent>
        <q-alert v-show="hasError" color="negative" icon="warning">
          {{ errormsg }}
        </q-alert>
        <q-alert v-show="hasGood" color="positive" icon="check">
          {{ goodmsg }}
        </q-alert>
        <q-alert v-show="hasAlert" color="blue-8" icon="mail">
          {{ alertmsg }}
        </q-alert>
        <q-field>
          <q-input type="email"
                   name="email"
                   ref="email"
                   id="email"
                   float-label="Email"
                   color="black"
                   placeholder="Digite seu email"
                   v-model="form.email"
                   :attributes="{
                      autocompletetype: 'email',
                      autocorrect: 'on'
                     }" />
        </q-field>
        <q-field>
          <q-input type="password"
                   name="password"
                   ref="password"
                   id="password"
                   float-label="Senha"
                   color="black"
                   placeholder="Digite sua senha"
                   v-model="form.password" />
        </q-field>

        <div class="row reverse justify-between items-end">
          <q-btn color="dark" @click="submit">
            Acessar
          </q-btn>
          <router-link to="/signup">
            Registrar-se
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { QField, QInput, QBtn, QAlert } from 'quasar'
export default {
  components: {
    QField,
    QInput,
    QBtn,
    QAlert
  },

  data () {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false
      },
      errormsg: '',
      alertmsg: '',
      goodmsg: ''
    }
  },

  computed: {
    hasError () {
      if (this.errormsg === '') return false
      return true
    },
    hasGood () {
      if (this.goodmsg === '') return false
      return true
    },
    hasAlert () {
      if (this.alertmsg === '') return false
      return true
    }
  },

  methods: {
    submit () {
      // Loading.show()
      this.$store.dispatch('login', this.form)
        .then(res => {
          if (this.$route.query.redirect) this.$router.push(this.$route.query.redirect)
          else this.$router.push('/')
        })
        .catch(err => {
          this.errormsg = 'Usuário/senha incorreto'
          console.log(err)
        })
    }
  },

  mounted () {
    if (this.$route.params.userJustCreated) {
      this.form.email = this.$route.params.userJustCreated
      this.goodmsg = 'Usuário criado com sucesso'
      this.alertmsg = 'Acesse seu e-mail para ativar sua conta'
      this.$refs.password.focus()
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

div.login-form
  margin 0 auto
  padding 25px 25px
  width 100%
  box-shadow 0 4px 8px rgba(0, 0, 0, .16),
             0 4px 8px rgba(0, 0, 0, .23)

  @media screen and (min-width: 500px)
    max-width 500px

  h5
    margin 0
    margin-bottom 10px

  .q-btn
    margin-top 10px
    margin-left 5px

  a
    font-size .85em
    color $blue-9

  a:hover
    color $blue-6
</style>
