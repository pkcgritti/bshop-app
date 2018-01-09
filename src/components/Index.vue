<template>
  <q-layout ref="layout"
            view="lHh Lpr fff">

    <q-toolbar slot="header" class="gloosy" color="black">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>{{ fullname }}</q-list-header>
        <q-side-link item to="/">
          <q-item-side icon="home" />
          <q-item-main label="Página inicial" sublabel="Barbershop Barão" />
        </q-side-link>
        <q-side-link item to="/client/schedule">
          <q-item-side icon="schedule" />
          <q-item-main label="Agendamento" sublabel="Agende um horário" />
        </q-side-link>
        <q-side-link item to="/barber/schedule">
          <q-item-side icon="schedule" />
          <q-item-main label="Agenda" sublabel="Confira sua agenda" />
        </q-side-link>
        <q-side-link item to="/barbers">
          <q-item-side icon="face" />
          <q-item-main label="Barbers" sublabel="Conheça nossa equipe" />
        </q-side-link>
        <q-side-link item to="/profile">
          <q-item-side icon="face" />
          <q-item-main label="Meu perfil" sublabel="Edite seu perfil" />
        </q-side-link>
        <q-side-link item to="/config">
          <q-item-side icon="settings" />
          <q-item-main label="Configurações" sublabel="Altere suas configurações" />
        </q-side-link>
        <q-item>
          <q-item-side icon="verified user" />
          <q-item-main label="Administrador" sublabel="Configurações de administrador" />
        </q-item>
      </q-list>
    </div>

    <router-view />
  </q-layout>
</template>

<script>

import {
  QLayout,
  QToolbar,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QSideLink,
  QItemSide,
  QItemMain
} from 'quasar'

export default {
  computed: {
    fullname () {
      return [this.$store.state.user.firstname, this.$store.state.user.lastname].join(' ')
    }
  },

  data () {
    return {
      username: 'Marcos Cesar Gritti'
    }
  },

  components: {
    QLayout,
    QToolbar,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QSideLink,
    QItemSide,
    QItemMain
  }
}
</script>

<style>
</style>
