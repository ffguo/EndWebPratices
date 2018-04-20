var vm =new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
        checkFlag: false,
        delFlag: false,
        curItem: null
    },
    filters: {
        formatMoney: function(value){
            return "￥ " + value;
        }
    },
    mounted: function () {
        this.cartView();
    },
    methods:{
        cartView: function (){
            var _this = this;
            this.$http.get("data/cartData.json", {"id":123}).then(function (res){
                //_this.totalMoney = res.data.result.totalMoney;
                _this.productList = res.data.result.list;
            })
        },
        changeQuantity: function (item, way){
            if(way > 0){
                item.productQuantity++;
            }else{
                item.productQuantity = Math.max(--item.productQuantity, 1);
            }
            this.calcTotalMoney();
        },
        selectProduct: function (item){
            if(typeof item.checked === 'undefined'){
                //Vue.$set(item, 'checked', true);
                this.$set(item, 'checked', true);
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalMoney();
        },
        selectAll: function (flag){
            this.checkFlag = flag;
            this.productList.forEach(item => {
                if(typeof item.checked === 'undefined'){
                    this.$set(item, 'checked', flag);
                }else{
                    item.checked = flag;
                }
            });
            this.calcTotalMoney();
        },
        calcTotalMoney: function (){
            this.totalMoney = 0;
            this.productList.forEach(item => {
                if(item.checked){
                    this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },
        delConfirm: function (item){
            this.curItem = item;
            this.delFlag = true;
        },
        delProduct: function (){
            var index = this.productList.indexOf(this.curItem);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
  });

  Vue.filter("money", function (value, type){
      return "￥ " + value.toFixed(2) + type;
  });