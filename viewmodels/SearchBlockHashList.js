var app = new Vue({
  el: '#app',
  data: {
    SearchByListDetail:''
  },
  mounted() {
       var url = new URL(location.href);
       var blockhash = url.searchParams.get("blockhash");
       var searchname = url.searchParams.get("searchname");
      
       this.getSelectHeightList(blockhash);
       this.getSearchByList(searchname)
  },
  methods: {
    getSelectHeightList(blockhash) {
      axios.get('/block/getByBlockhash', {
        params: {
          blockhash: blockhash
        }
      })
        .then(function (response) {
          console.log(response);
          app.SearchByListDetail = response.data;
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
          app.SearchByListDetail = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})