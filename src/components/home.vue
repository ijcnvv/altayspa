<template lang="pug">
include ../tools/mixins.pug
+b.MAIN.main
  app-nav
  +e.APP-INTRO.block
  +e.APP-PROMO
  +e.APP-PROGRAM.block
  +e.APP-GALLERY.block
  +e.APP-FEEDBACK.block
  +e.APP-CONTACTS.block
  +e.APP-ORDER-SERTIFICATE
</template>

<script>
import appNav from './topnav'
import appPromo from './promo'
import appIntro from './intro'
import appProgram from './program'
import appGallery from './gallery'
import appContacts from './contacts'
import appFeedback from './feedback'
import appOrderSertificate from './orderSertificate'

export default {
  components: {
    appNav,
    appIntro,
    appProgram,
    appGallery,
    appContacts,
    appFeedback,
    appPromo,
    appOrderSertificate
  }
}
</script>
