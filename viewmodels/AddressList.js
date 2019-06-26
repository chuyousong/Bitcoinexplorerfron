var app = new Vue({
  el: '#app',
  data: {
    addressByListDeail: ''
  },
  mounted() {
    var url = new URL(location.href);
    var address = url.searchParams.get("address");
    var searchname = url.searchParams.get("searchname");
    this.getAddressByList(address);
    this. getSearchByList(searchname);
  },
  methods: {
    getAddressByList(address) {
      axios.get('/transactionsdetail/getAddressByList', {
        params: {
          address: address
        }
      })
        .then(function (response) {
          console.log(response);
          app.addressByListDeail = response.data;
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
          app.addressByListDeail = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})