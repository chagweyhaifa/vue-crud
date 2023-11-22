<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy"></q-header>
    <q-page-container>
      <Home />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Home from './components/Home.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Home
  },

  setup() {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
