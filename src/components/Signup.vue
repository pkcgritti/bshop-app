<template>
  <div class="layout-padding">
    <div class="signup-form">
      <h5>Registrar-se</h5>
      <form id="signupform" action="" @submit.prevent>
        <q-alert v-show="hasError" color="negative" icon="warning">
          {{ errormsg }}
        </q-alert>
        <q-alert v-show="hasAlert" color="warning" icon="warning">
          {{ alertmsg }}
        </q-alert>
        <q-field :error="formError.username"
                 :error-label="errorLabel.username"
        >
          <q-input type="text"
                   name="username"
                   ref="username"
                   id="username"
                   float-label="Nome de usuário"
                   color="black"
                   placeholder="Escolha um nome de usuário"
                   v-model="form.username"
                   :attributes="{
                     autocompletetype: 'text',
                     autocorrect: 'on'
                     }" />
        </q-field>

        <q-field :error="formError.firstname"
                 :error-label="errorLabel.firstname"
        >
          <q-input type="text"
                   name="firstname"
                   ref="firstname"
                   id="firstname"
                   float-label="Nome"
                   color="black"
                   placeholder="Digite seu primeiro nome"
                   v-model="form.firstname"
                   :attributes="{
                     autocompletetype: 'name',
                     autocorrect: 'on'
                     }" />
        </q-field>

        <q-field :error="formError.lastname"
                 :error-label="errorLabel.lastname"
        >
          <q-input type="text"
                   name="lastname"
                   ref="lastname"
                   id="lastname"
                   float-label="Sobrenome"
                   color="black"
                   placeholder="Digite seu sobrenome"
                   v-model="form.lastname"
                   :attributes="{
                     autocompletetype: 'name',
                     autocorrect: 'on'
                     }" />
        </q-field>

        <q-field :error="formError.email"
                 :error-label="errorLabel.email">
          <q-input type="email"
                   name="email"
                   ref="email"
                   id="email"
                   float-label="E-mail"
                   color="black"
                   placeholder="Digite seu email"
                   v-model="form.email"
                   :attributes="{
                     autocompletetype: 'email',
                     autocorrect: 'on'
                     }" />
        </q-field>

        <q-field :error="formError.password"
                 :error-label="errorLabel.password"
        >
          <q-input type="password"
                   name="password"
                   ref="password"
                   id="password"
                   float-label="Senha"
                   color="black"
                   placeholder="Escolha uma senha"
                   v-model="form.password" />
        </q-field>

        <q-field :error="formError.passwordConfirmation"
                 :error-label="errorLabel.passwordConfirmation">
          <q-input type="password"
                   name="password-confirm"
                   ref="passwordConfirmation"
                   id="password-confirm"
                   float-label="Confirmação de senha"
                   color="black"
                   placeholder="Confirme a senha escolhida"
                   v-model="form.passwordConfirmation" />
        </q-field>

        <div class="row reverse justify-between items-end">
          <q-btn color="dark" @click="submit">
            Enviar
          </q-btn>
          <router-link to="/login">
            Retornar à página de login
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
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      validations: {
        username () {
          return (this.form.username.length === 0) ? 'Campo é obrigatório' : ''
        },
        firstname () {
          return (this.form.firstname.length === 0) ? 'Campo é obrigatório' : ''
        },
        lastname () {
          return (this.form.lastname.length === 0) ? 'Campo é obrigatório' : ''
        },
        email () {
          if (this.form.email.length === 0) return 'Campo é obrigatório'
          if (this.form.email.indexOf('@') === -1) return 'Faltando caracter "@"'
          return ''
        },
        password () {
          return (this.form.password.length === 0) ? 'Campo é obrigatório' : ''
        },
        passwordConfirmation () {
          if (this.form.passwordConfirmation.length === 0) return 'Campo é obrigatório'
          return (this.form.password !== this.form.passwordConfirmation)
            ? 'Senha diverge da especificada no campo anterior' : ''
        }
      },
      errorLabel: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errormsg: '',
      alertmsg: ''
    }
  },

  computed: {
    hasError () {
      if (this.errormsg === '') return false
      return true
    },
    hasAlert () {
      if (this.alertmsg === '') return false
      return true
    },
    formError () {
      let errorFlags = {}
      Object.keys(this.errorLabel).map(key => {
        errorFlags[key] = (this.errorLabel[key] !== '')
      })
      return errorFlags
    }
  },

  methods: {
    focusFirstError () {
      let firstKey = null
      Object.keys(this.errorLabel).map(key => {
        if (!firstKey && this.errorLabel[key] !== '') firstKey = key
      })
      if (firstKey) this.$refs[firstKey].focus()
    },

    formHasErrors () {
      let foundError = false
      Object.keys(this.errorLabel).map(key => {
        this.errorLabel[key] = this.validations[key].bind(this)()
        if (!foundError && this.errorLabel[key] !== '') foundError = true
      })
      if (foundError) {
        this.focusFirstError()
        return true
      }
      return false
    },

    submit () {
      if (!this.formHasErrors()) {
        let form = Object.assign({}, this.form)
        delete form.passwordConfirmation
        this.$store.dispatch('signup', form)
          .then(res => {
            // TODO: Show loading???
            this.$router.push({ name: 'login', params: { userJustCreated: form.email } })
          })
          .catch(err => {
            if (err.data.field) this.errorLabel[err.data.field] = err.data.message
            this.errormsg = err.data.error
            this.focusFirstError()
          })
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

div.signup-form
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
