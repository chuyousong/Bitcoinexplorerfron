var app = new Vue({
  el: '#app',
  data: {
    blockList: [],
    transactionsList: [],
    socket: '',
    stompclient: '',
    search: '',
    options: [{
      value: '1',
      label: 'Bitcoin'
    }, {
      value: '2',
      label: 'Ethereum'
    }],
    type: '1'
  },
  computed: {
    getList() {
      var now = Date.now();
      this.blockList.forEach(block => {
        var time2 = this.myTime(block.time);
        var date = new Date(time2);
        block.time = parseInt((now - date.getTime()) / 1000 / 60) + " minutes";
        block.size = block.size.toLocaleString('en');
      });
      return this.blockList;
    },
    gettransactionsLista() {
      var now = Date.now();
      this.transactionsList.forEach(tran => {
        var time2 = this.myTime(tran.time);
        var date = new Date(time2);
        tran.time = parseInt((now - date.getTime()) / 1000 / 60) + " minutes";
        tran.size = tran.size.toLocaleString('en');
        var a = tran.amount1 = "$" + tran.amount * 8350;
      })
      return this.transactionsList;
    }
  },
  mounted() {
    this.getSelectListBlocks();
    this.handleConnect();
    // this.getSelectListTransactions();
  },
  methods: {                                             
    myTime(date){
          var arr=date.split("T");
          var d=arr[0];
         var darr = d.split('-');
      
         var t=arr[1];
         var tarr = t.split('.000');
         var marr = tarr[0].split(':');
      
         var dd = parseInt(darr[0])+"/"+parseInt(darr[1])+"/"+parseInt(darr[2])+" "+parseInt(marr[0])+":"+parseInt(marr[1])+":"+parseInt(marr[2]);
       return dd;
      },
    getSelectListBlocks() {   // 获取block的信息
      axios.get('/block/getSelectListBlocks')
        .then(function (response) {
          console.log(response);
          app.blockList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    getSelectListTransactions() {   // 获取交易的信息
      axios.get('/transactions/transactionGetList')
        .then(function (response) {
          console.log(response);
          app.transactionsList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleConnect() {   // 连接
      this.socket = new SockJS('http://localhost:8080/cysstompsrv');
      this.stompclient = Stomp.over(this.socket);
      this.stompclient.connect({}, frame => {
        console.log(frame);
        this.stompclient.subscribe('/mytopic/greetings', function (data) {
          console.log(data)
          var array = JSON.parse(data.body); // 
          app.transactionsList = array;
        });
      });
    },
    SearchBySelect(search) {   //搜索    
      var reg = /^0{10}[0-9a-z]{54}/;  
      console.log(reg);
      if (search.length == 64) {       
        if(search.match(reg)){
          location.href = "SearchBlockHashList.html?searchname=" + search;     
        }else{
          location.href = "transactionsTxhasha.html?searchname=" + search;          
        }          
      } else if (search.length < 8) {
        location.href = "BlockHeightList.html?searchname=" + search;
      } else if (search.length > 10 && search.length < 50) {
        location.href = "AddressList.html?searchname=" + search;
      }
    },
    selectBlock() {
      this.getSelectListBlocks();
    },
    selecttransaction() {
      this.getSelectListTransactions();
    },
    getClickHeight(row) {
      location.href = "BlockHeightList.html?height=" + row;
    },
    BlockviewMoreClick() {
      location.href = "BlockView.html";
    },
    getClickTxhash(row) {
      location.href = "transactionsTxhasha.html?txhash=" + row;
    },
    transactionviewMoreClick() {
      location.href = "TransactionView.html";
    },
    autoAddress() {
      this.search = "2NDhzMt2D9ZxXapbuq567WGeWP7NuDN81cg";
    },
    autoTransaction() {
      this.search = "b5c8681ee8c62a0cf464fd578f718619c1fe7e9b78f21a9e55c08bfac3110bee";
    },
    autoBlock() {
      this.search = "000000000000001295d4947bae425850cc2201078bef19d7a9ce390e59a31d88";
    },
    autoHeight() {
      this.search = "1564830";
    }
  } 

})