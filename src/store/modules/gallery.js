export default {
  namespaced: true,
  state: {
    list: [{
      src: '/img/gallery/akb_1.jpg',
      preview: '/img/gallery/akb_1_1.jpg',
      city: 1
    },
    {
      src: '/img/gallery/akb_2.jpg',
      preview: '/img/gallery/akb_2_1.jpg',
      city: 1
    },
    {
      src: '/img/gallery/akb_3.jpg',
      preview: '/img/gallery/akb_3_1.jpg',
      city: 1
    },
    {
      src: '/img/gallery/akb_4.jpg',
      preview: '/img/gallery/akb_4_1.jpg',
      city: 1
    },
    {
      src: '/img/gallery/akb_5.jpg',
      preview: '/img/gallery/akb_5_1.jpg',
      city: 1
    },
    {
      src: '/img/gallery/akb_6.jpg',
      preview: '/img/gallery/akb_6_1.jpg',
      city: 1
    },
    {
      src: '/img/gallery/akb_7.jpg',
      preview: '/img/gallery/akb_7_1.jpg',
      city: 1
    },
    {
      src: '/img/gallery/tmn_1.jpg',
      preview: '/img/gallery/tmn_1_1.jpg',
      city: 2
    },
    {
      src: '/img/gallery/tmn_2.jpg',
      preview: '/img/gallery/tmn_2_1.jpg',
      city: 2
    },
    {
      src: '/img/gallery/tmn_3.jpg',
      preview: '/img/gallery/tmn_3_1.jpg',
      city: 2
    },
    {
      src: '/img/gallery/tmn_4.jpg',
      preview: '/img/gallery/tmn_4_1.jpg',
      city: 2
    },
    {
      src: '/img/gallery/tmn_5.jpg',
      preview: '/img/gallery/tmn_5_1.jpg',
      city: 2
    },
    {
      src: '/img/gallery/tmn_6.jpg',
      preview: '/img/gallery/tmn_6_1.jpg',
      city: 2
    },
    {
      src: '/img/gallery/tmn_7.jpg',
      preview: '/img/gallery/tmn_7_1.jpg',
      city: 2
    },
    {
      src: '/img/gallery/tmn_8.jpg',
      preview: '/img/gallery/tmn_8_1.jpg',
      city: 2
    },{
      src: '/img/gallery/spb_1.jpg',
      preview: '/img/gallery/spb_1_1.jpg',
      city: 3
    },
    {
      src: '/img/gallery/spb_2.jpg',
      preview: '/img/gallery/spb_2_1.jpg',
      city: 3
    },
    {
      src: '/img/gallery/spb_3.jpg',
      preview: '/img/gallery/spb_3_1.jpg',
      city: 3
    },
    {
      src: '/img/gallery/spb_4.jpg',
      preview: '/img/gallery/spb_4_1.jpg',
      city: 3
    },
    {
      src: '/img/gallery/spb_5.jpg',
      preview: '/img/gallery/spb_5_1.jpg',
      city: 3
    },
    {
      src: '/img/gallery/spb_6.jpg',
      preview: '/img/gallery/spb_6_1.jpg',
      city: 3
    },
    {
      src: '/img/gallery/spb_7.jpg',
      preview: '/img/gallery/spb_7_1.jpg',
      city: 3
    },
    {
      src: '/img/gallery/spb_8.jpg',
      preview: '/img/gallery/spb_8_1.jpg',
      city: 2
    }
    ]
  },
  getters: {
    list(state){
      return state.list
    },
    currenCityList (state, getters) {
      return city => getters.list.filter(item => item.city == city)
    }
  }
}