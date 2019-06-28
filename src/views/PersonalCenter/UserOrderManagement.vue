<template>
    <div id="user-order-management">
        <div class="title">
            <div class="line"></div>
            <span>由您预约的设备列表</span>
        </div>
        <div class="device-list-by-you">
            <div class="list-item">
                <DeviceListItemByYou :OrderInfo="OrderInfo1"></DeviceListItemByYou>
            </div>
            <div class="list-item">
                <DeviceListItemByYou :OrderInfo="OrderInfo2"></DeviceListItemByYou>
            </div>
        </div>
    </div>
</template>
<script>
import DeviceListItemByYou from '@/components/DeviceListItemByYou.vue'
export default {
    name:"UserOrderManagement",
    components: {
        DeviceListItemByYou
    },
    data () {
        return {
            OrderInfo1:{eName:"制剂机械",eId:"2",time:"2019/4/18 8:00-10:00",uId:this.$root.getUId(),uName:"王三"},
            OrderInfo2:{eName:"药品包装机械",eId:"5",time:"2019/4/18 8:00-10:00",uId:this.$root.getUId(),uName:"王三"},
        }
    }
}
</script>
<style>
#user-order-management{
    margin-top:20px;
}
#user-order-management .title{
    text-align: start;
    color: gray;
    margin-left:20px;
    font-size:13px;
    margin-bottom: 10px; 
    position: relative;
}
#user-order-management .title .line{
    /* padding-top:5px; */
    border-bottom: 1px solid rgb(116, 114, 114);
    width:98%;
}
#user-order-management .title span{
    position: absolute;
    /* display: block; */
    background: white;
    top:-10px;
    left:20px;

}
#user-order-management .device-list-by-you{
    margin-top:20px;
    width:100%;
    height:100%;
}
#user-order-management .list-item{
    width:95%;
    margin:0 auto;
    margin-top:10px;
}
</style>
