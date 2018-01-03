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
        <q-list-header>{{ username }}</q-list-header>
        <q-item @click="$router.push('/')">
          <q-item-side icon="home" />
          <q-item-main label="Página inicial" sublabel="Barbershop Barão" />
        </q-item>
        <q-item @click="$router.push('/client/schedule')">
          <q-item-side icon="schedule" />
          <q-item-main label="Agendamento" sublabel="Agende um horário" />
        </q-item>
        <q-item @click="$router.push('/barber/schedule')">
          <q-item-side icon="schedule" />
          <q-item-main label="Agenda" sublabel="Confira sua agenda" />
        </q-item>
        <q-item @click="$router.push('/barbers')">
          <q-item-side icon="face" />
          <q-item-main label="Barbers" sublabel="Conheça nossa equipe" />
        </q-item>
        <q-item @click="$router.push('/profile')">
          <q-item-side icon="face" />
          <q-item-main label="Meu perfil" sublabel="Edite seu perfil" />
        </q-item>
        <q-item @click="$router.push('/config')">
          <q-item-side icon="settings" />
          <q-item-main label="Configurações" sublabel="Altere suas configurações" />
        </q-item>
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
  QItemSide,
  QItemMain
} from 'quasar'

export default {
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
    QItemSide,
    QItemMain
  }
}
</script>

<style>
</style>

