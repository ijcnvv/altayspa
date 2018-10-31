<template lang="pug">
v-container.fluid.wrong
  .inner.wrong__inner
    .wrong__wrap
      .wrong__code 404
      h1.wrong__title Cтраница не найдена
      router-link.wrong__link(:to="{name: 'home'}")
        v-btn.ma-0.mt-4(round outline large color="white") На главную
</template>
