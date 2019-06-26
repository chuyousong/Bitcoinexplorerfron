var app = new Vue({
  el: '#app',
  data: {
    HeightByListDetail:''
  },
  mounted() {
       var url = new URL(location.href);
       var height = url.searchParams.get("height");
       var searchname = url.searchParams.get("searchname");
      
       this.getSelectHeightList(height);
       this.getSearchByList(searchname)
  },
  methods: {
    getSelectHeightList(height) {
      axios.get('/block/getByHeight', {
        params: {
          height: height
        }
      })
        .then(function (response) {
          console.log(response);
          app.HeightByListDetail = response.data;
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
          app.HeightByListDetail = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})