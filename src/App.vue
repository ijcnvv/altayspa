<template lang="pug">
include tools/mixins.pug
+b.SECTION.page
  +e.APP-HEADER.header
  +e.ROUTER-VIEW.main
  +e.APP-FOOTER.footer
</template>

<script>
import appHeader from './components/header'
import appFooter from './components/footer'
export default {
  components: {
    appHeader,
    appFooter
  }
}
</script>
