new Vue({
    el: ".container",
    data: {
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1,
        addressList: []
    },
    mounted: function (){
        this.$nextTick(function (){
            this.getAddressList();
        })
    },
    computed: {
        filterAddress: function (){
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function (){
            this.$http.get('data/address.json').then(response => {
                var datas = response.data;
                if(datas.status === 0){
                    this.addressList = datas.result;
                }
            })
        },
        setDefault: function (addressId){
            this.addressList.forEach(element => {
                if(element.addressId == addressId){
                    element.isDefault = true;
                }else{
                    element.isDefault = false;
                }
            });
        }
    }
})