var app = new Vue({
  el: '#app',
  data: {
    viewMoreTransList: []
  },
  computed: {
    getTransList() {
      this.viewMoreTransList.forEach(block => {
        block.time = block.time.substr(0,10);
        block.weight = block.weight.toLocaleString('en');
        block.amount1 = "$" + block.amount * 8350;
        block.size = block.size.toLocaleString('en');
      });
      return this.viewMoreTransList;
    }
  },
  mounted() {
    this.getViewTransMore();
  },
  methods: {
    getViewTransMore() {
      axios.get('/transactions/transactionGetList')
        .then(function (response) {
          console.log(response);
          app.viewMoreTransList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})