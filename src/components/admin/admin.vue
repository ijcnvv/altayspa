<template lang="pug">
main.main.main_flex
  app-signin(v-if="!isAuth")
  app-body(v-else)
</template>

<script>
import appSignin from './signin'
import appBody from './body'
import {mapGetters} from 'vuex'

export default {
  components: {
    appSignin,
    appBody
  },
  computed: {
    ...mapGetters({
      isAuth: 'user/getAuth'
    })
  }
}
</script>
