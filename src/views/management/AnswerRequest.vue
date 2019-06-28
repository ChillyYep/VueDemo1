<template>
    <div id="answer-request">
        <!-- <h1>answer</h1> -->
        <div class="title">
            <div class="line"></div>
            <span>报修列表</span>
        </div>
        <div class="request-list">
            <div class="list-item">
                <DeviceListItemByAdmin :RequestInfo="RequestInfo"></DeviceListItemByAdmin>
            </div>
        </div>
    </div>
</template>
<script>
import DeviceListItemByAdmin from '@/components/DeviceListItemByAdmin.vue'
export default {
    name:"AnswerRequest",
    components:{
        DeviceListItemByAdmin
    },
    data () {
        return {
            RequestInfo:{eName:"药用粉碎机械",eId:"7",uName:"李四",uId:"255",description:"零件松动"}
        }
    }
}
</script>
<style>
#answer-request .title{
    text-align: start;
    color: gray;
    margin-left:20px;
    font-size:13px;
    margin-bottom: 10px; 
    position: relative;
}
#answer-request .title .line{
    /* padding-top:5px; */
    border-bottom: 1px solid rgb(116, 114, 114);
    width:95%;
}
#answer-request .title span{
    position: absolute;
    /* display: block; */
    background: white;
    top:-10px;
    left:20px;

}
</style>
