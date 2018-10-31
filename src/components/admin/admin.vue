<template lang="pug">
include ../../tools/mixins.pug
app-signin(v-if="!isAuth")
</template>

<script>
import appSignin from './signin'
import {mapGetters} from 'vuex'

export default {
  components: {
    appSignin
  },
  computed: {
    ...mapGetters({
      isAuth: 'user/getAuth'
    })
  }
}
</script>
