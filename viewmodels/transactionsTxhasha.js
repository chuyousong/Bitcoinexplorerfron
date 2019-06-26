var app = new Vue({
  el: '#app',
  data: {
    HashByListDetail: '',
    
  },
  mounted() {
    var url = new URL(location.href);
    var txhash = url.searchParams.get("txhash");
    var searchname = url.searchParams.get("searchname");
    this.getHashByList(txhash);
    this.getSearchByList(searchname)
  },
  methods: {
    getHashByList(txhash) {
      axios.get('/transactions/transactionHash', {
        params: {
          txhash: txhash
        }
      })
        .then(function (response) {
          console.log(response);
          app.HashByListDetail = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getSearchByList(searchname) {   // 搜索
      axios.get('/search/searchAll', {
        params: {
          searchname: searchname    
        }
      })
        .then(function (response) {
          console.log(response);
          app.HashByListDetail = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})