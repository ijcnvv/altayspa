<template lang="pug">
include ../tools/mixins.pug
+b.MAIN.main
  app-info
  app-nav
  //- +e.APP-INTRO.block
  +e.APP-ABOUT.block
  +e.APP-PROMO
  +e.APP-PROGRAM.block
  +e.APP-GALLERY.block
  +e.APP-SERTIFICATE.block
  +e.APP-FEEDBACK.block
  +e.APP-CONTACTS.block
  +e.APP-ORDER-SERTIFICATE
</template>

<script>
import appInfo from './header/info'
import appNav from './header/navtop'
import appPromo from './promo'
import appIntro from './intro/intro'
import appAbout from './intro/about'
import appProgram from './program'
import appGallery from './gallery'
import appContacts from './contacts/contacts'
import appFeedback from './feedback'
import appSertificate from './sertificate/sertificate'
import appOrderSertificate from './sertificate/orderSertificate'

export default {
  components: {
    appInfo,
    appNav,
    appIntro,
    appAbout,
    appProgram,
    appGallery,
    appContacts,
    appFeedback,
    appPromo,
    appSertificate,
    appOrderSertificate
  }
}
</script>
