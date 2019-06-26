var app = new Vue({
  el: '#app',
  data: {
    viewMoreList: []
  },
  computed: {
    getList() {
      this.viewMoreList.forEach(block => {
        block.time = block.time.substr(0,10);
        block.weight = block.weight.toLocaleString('en');
        block.size = block.size.toLocaleString('en');
      });
      return this.viewMoreList;
    }
  },
  mounted() {
    this.getViewMore();
  },
  methods: {
    getViewMore() {
      axios.get('/block/getSelectListBlocks')
        .then(function (response) {
          console.log(response);
          app.viewMoreList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})